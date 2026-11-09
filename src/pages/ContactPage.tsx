import React, { useState, useRef } from 'react';
import { useFoundation } from '../context/FoundationContext';
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  Send,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import {
  getContactGasEndpoint,
  isConfiguredGasEndpoint,
  FOUNDATION_INFO_EMAIL,
  CONTACT_CATEGORY_OPTIONS,
} from '../config/contact';

interface ContactPageProps {
  openPolicyModal: (policyId: string) => void;
}

// RFC 4122 v4 UUID generator (Native crypto.randomUUID with compliant fallback)
function generateClientRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export type SubmissionErrorKind =
  | 'none'
  | 'validation_client'
  | 'gas_rejection'
  | 'uuid_conflict'
  | 'unknown_network';

export const ContactPage: React.FC<ContactPageProps> = ({ openPolicyModal }) => {
  const { currentFullName } = useFoundation();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    category: '助成事業について',
    message: '',
    agreed: false,
    hp_trap: '', // Anti-bot honeypot field
  });

  // Unique RFC 4122 v4 UUID for the current submission attempt.
  // Maintained across network errors and retries to ensure backend idempotency.
  const [clientRequestId, setClientRequestId] = useState<string>(() => generateClientRequestId());

  // Snapshot of payload submitted in the last attempt (to detect modifications during retry)
  const lastSubmittedPayloadRef = useRef<string | null>(null);

  // GAS Web App endpoint URL (uses VITE_CONTACT_GAS_URL in production)
  const [gasEndpoint] = useState<string>(() => getContactGasEndpoint());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    submissionId?: string;
    savedToSheet: boolean;
    mailDispatched: boolean;
    status: string;
    timestamp: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorKind, setErrorKind] = useState<SubmissionErrorKind>('none');

  const isEndpointReady = isConfiguredGasEndpoint(gasEndpoint);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const nextVal = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    // 通信結果不明（unknown_network）時に利用者が入力内容を変更した場合、
    // 同じUUIDで異なる本文を再送して競合（ID_CONTENT_CONFLICT / CONFLICT_DIFF_PAYLOAD）を起こさないよう、
    // 新しいUUIDを発行し、エラー通知を解除して通常の新規送信モードに戻す。
    if (errorKind === 'unknown_network') {
      setClientRequestId(generateClientRequestId());
      setErrorKind('none');
      setErrorMsg('');
    } else if (errorKind === 'validation_client' || errorKind === 'uuid_conflict') {
      setErrorMsg('');
      setErrorKind('none');
    }

    setFormData((prev) => ({ ...prev, [name]: nextVal }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setErrorKind('none');

    // 1. Client-side Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorKind('validation_client');
      setErrorMsg('必須項目（お名前、メールアドレス、お問い合わせ内容）をご入力ください。');
      return;
    }
    if (!formData.agreed) {
      setErrorKind('validation_client');
      setErrorMsg('個人情報保護方針への同意が必要です。');
      return;
    }

    const endpointToUse = gasEndpoint.trim();
    if (!isConfiguredGasEndpoint(endpointToUse)) {
      setErrorKind('gas_rejection');
      setErrorMsg(
        '現在お問い合わせフォームの保守作業中です。お手数ですが、当財団公式メールアドレス（info@nagomi-zaidan.or.jp）まで直接ご連絡くださいますようお願い申し上げます。'
      );
      return;
    }

    // Build payload snapshot to detect any edits compared to previous attempt
    const currentPayloadSnapshot = JSON.stringify({
      name: formData.name.trim(),
      organization: formData.organization.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      category: formData.category,
      message: formData.message.trim(),
      agreed: formData.agreed,
    });

    // If user edited content after a previous submission attempt,
    // guarantee a fresh UUID so we never send a modified body with an old UUID
    let requestIdToUse = clientRequestId;
    if (
      lastSubmittedPayloadRef.current !== null &&
      lastSubmittedPayloadRef.current !== currentPayloadSnapshot
    ) {
      requestIdToUse = generateClientRequestId();
      setClientRequestId(requestIdToUse);
    }
    lastSubmittedPayloadRef.current = currentPayloadSnapshot;

    setIsSubmitting(true);

    try {
      // Production GAS payload
      const payload = {
        clientRequestId: requestIdToUse,
        name: formData.name.trim(),
        organization: formData.organization.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        category: formData.category,
        message: formData.message.trim(),
        agreed: formData.agreed,
        hp_trap: formData.hp_trap,
      };

      const response = await fetch(endpointToUse, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`受付サーバーとの通信でエラーが発生しました (HTTP ${response.status} ${response.statusText})`);
      }

      let data: any;
      try {
        data = await response.json();
      } catch {
        throw new Error('受付サーバーからの応答（JSON）を解析できませんでした。');
      }

      // Check 1: Normal Reception Success (recorded in Google Sheet)
      if (data.success === true && data.savedToSheet === true) {
        setSubmissionResult({
          submissionId: data.submissionId,
          savedToSheet: true,
          mailDispatched: data.mailDispatched === true,
          status: data.status,
          timestamp: new Date().toISOString(),
        });
        setSubmitted(true);
        setErrorKind('none');
        setErrorMsg('');
        return;
      }

      // Check 2: UUID Conflict (CONFLICT_DIFF_PAYLOAD or ID_CONTENT_CONFLICT)
      // Server explicitly identified identical clientRequestId with differing payload.
      // Both status codes are recognized as UUID conflict.
      // Fix: Regenerate a fresh RFC 4122 v4 UUID and notify user clearly.
      if (
        data.status === 'CONFLICT_DIFF_PAYLOAD' ||
        data.status === 'ID_CONTENT_CONFLICT'
      ) {
        const freshRequestId = generateClientRequestId();
        setClientRequestId(freshRequestId);
        lastSubmittedPayloadRef.current = null;
        setErrorKind('uuid_conflict');
        setErrorMsg(
          '同一のリクエスト識別番号（UUID）で前回と異なる入力内容が検出されたため、二重登録防止機能により受付が保留されました。新しいお問い合わせとして送信できるよう新しい識別番号を自動発行しました。内容をご確認の上、改めて送信ボタンを押してください。'
        );
        return;
      }

      // Check 3: GAS Input / Policy Rejection (Bot discard, hourly quota, or validation rejection)
      // Communication succeeded, but GAS explicitly rejected the submission.
      setErrorKind('gas_rejection');
      if (data.status === 'BOT_DISCARDED') {
        setErrorMsg('自動送信または不正なリクエストとして判定されました。');
      } else if (data.status === 'HOURLY_QUOTA_EXCEEDED') {
        setErrorMsg(
          'ただいまアクセスが集中しており、時間あたりの受付上限に達しております。誠に恐れ入りますが、しばらく時間をおいていただくか、公式メールアドレス（info@nagomi-zaidan.or.jp）まで直接ご連絡ください。'
        );
      } else {
        setErrorMsg(
          data.message || data.error || '入力内容の形式に不備があるため受け付けられませんでした。入力内容をご確認ください。'
        );
      }
      return;
    } catch (err: any) {
      console.error('Contact submission error (unknown communication result):', err);
      // NOTE: clientRequestId is deliberately NOT reset here, enabling safe idempotent retry with identical UUID!
      setErrorKind('unknown_network');
      setErrorMsg(
        err.message ||
          '送信中に通信エラーが発生しました。サーバーからの受付完了確認を受信できませんでした。'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setSubmissionResult(null);
    setErrorMsg('');
    setErrorKind('none');
    lastSubmittedPayloadRef.current = null;
    // Generate a fresh RFC 4122 v4 UUID for the next distinct inquiry
    setClientRequestId(generateClientRequestId());
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      category: '助成事業について',
      message: '',
      agreed: false,
      hp_trap: '',
    });
  };

  // Direct mailto link generator (pre-fills all entered fields for fallback assistance)
  const mailtoUrl = `mailto:${FOUNDATION_INFO_EMAIL}?subject=${encodeURIComponent(
    `【お問い合わせ】[${formData.category || '助成事業について'}] ${formData.name || 'ご相談者'}様${formData.organization ? `（${formData.organization}）` : ''}`
  )}&body=${encodeURIComponent(
    [
      `一般財団法人なごみ平和財団 事務局 御中`,
      `（宛先: ${FOUNDATION_INFO_EMAIL}）`,
      ``,
      `公式ホームページのお問い合わせフォームより送信いたします。`,
      ``,
      `--------------------------------------------------`,
      `【リクエスト番号】: ${submissionResult?.submissionId || clientRequestId}`,
      `【お名前】: ${formData.name}`,
      `【ご所属・団体名】: ${formData.organization || '（未入力）'}`,
      `【メールアドレス】: ${formData.email}`,
      `【お電話番号】: ${formData.phone || '（未入力）'}`,
      `【お問い合わせ項目】: ${formData.category}`,
      ``,
      `【お問い合わせ内容】:`,
      formData.message,
      `--------------------------------------------------`,
    ].join('\n')
  )}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#e7e4dc] pb-8">
        <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
          CONTACT US
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22211e] tracking-tight font-serif">
          お問い合わせ
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
          <span className="inline-block">{currentFullName}への助成事業、寄附、取材、その他に関するご質問・ご相談は、</span>
          <span className="inline-block">下記のお問い合わせフォームよりお寄せください。</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Office Contact Info Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#faf9f5] rounded-xl border border-[#e7e4dc] p-5 sm:p-6 space-y-4 text-xs text-stone-700 shadow-xs">
            <h2 className="font-bold text-stone-900 text-sm flex items-center gap-2 pb-1 border-b border-[#e7e4dc]">
              <Building className="w-4 h-4 text-[#47623d]" />
              <span>事務局・お問い合わせ先</span>
            </h2>

            {/* 1. 助成事業事務局（公募・応募相談窓口） */}
            <div className="p-4 bg-white rounded-lg border border-[#d6e3cf] space-y-3 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#47623d] font-bold text-xs sm:text-[13px]">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>助成事業事務局（公募・相談窓口）</span>
              </div>
              <div className="space-y-2 text-stone-700">
                <div className="leading-snug">
                  <p className="font-semibold text-stone-900 text-xs sm:text-[13px]">
                    {currentFullName}
                  </p>
                  <p className="text-stone-700 font-medium text-xs mt-0.5">
                    事務局担当：數見（かずみ）
                  </p>
                </div>
                <div className="flex items-start gap-1.5 text-stone-600 leading-relaxed text-xs">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-stone-500 font-mono">〒100-0004</span>
                    <span className="block font-medium text-stone-800">東京都千代田区大手町2-2-1</span>
                    <span className="block text-stone-600">新大手町ビル702</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <span className="text-stone-500 text-[11px] block font-medium">公式メールアドレス：</span>
                  <a
                    href={`mailto:${FOUNDATION_INFO_EMAIL}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f2f6ef] hover:bg-[#e4eedf] border border-[#d6e3cf] rounded-md text-[#374d2e] font-bold font-mono text-xs transition-colors whitespace-nowrap"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#47623d] shrink-0" />
                    <span>{FOUNDATION_INFO_EMAIL}</span>
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-[#47623d] bg-[#f2f6ef] p-2.5 rounded-md font-medium leading-relaxed border border-[#d6e3cf]/60">
                <span className="inline-block">※助成金の応募書類提出、</span>
                <span className="inline-block">募集要領や申請手続きに関するご相談はこちらへお送りください。</span>
              </p>
            </div>

            {/* 2. 主たる事務所 */}
            <div className="space-y-1.5 pt-2 border-t border-[#e7e4dc]">
              <span className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>主たる事務所</span>
              </span>
              <div className="text-stone-600 leading-relaxed pl-5 text-xs space-y-0.5">
                <span className="block text-[11px] text-stone-500 font-mono">〒100-0004</span>
                <span className="block text-stone-800 font-medium">東京都千代田区大手町2-2-1　新大手町ビル702</span>
                <span className="block text-stone-500 text-[11px]">（移転手続き中）</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e7e4dc] space-y-1.5 text-[11px] text-stone-500 leading-relaxed">
              <p>※お問い合わせ内容によっては、回答まで数日お時間をいただく場合がございます。</p>
            </div>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="lg:col-span-7">
          {/* Unconfigured endpoint notice for general visitors */}
          {!isEndpointReady && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>現在、Webお問い合わせフォームの保守作業を行っております</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                恐れ入りますが、当財団へのご質問・ご相談は公式メールアドレス（
                <a
                  href={`mailto:${FOUNDATION_INFO_EMAIL}`}
                  className="font-mono text-[#47623d] font-bold underline hover:text-[#32452b]"
                >
                  {FOUNDATION_INFO_EMAIL}
                </a>
                ）まで直接お送りくださいますようお願い申し上げます。
              </p>
            </div>
          )}

          {submitted ? (
            /* Submission Success View */
            <div className="bg-white rounded-xl border border-[#d6e3cf] p-6 sm:p-10 shadow-xs space-y-6">
              <div className="text-center space-y-3">
                <div className="w-14 h-14 bg-[#f2f6ef] text-[#47623d] rounded-full flex items-center justify-center mx-auto border border-[#d6e3cf]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  お問い合わせを受け付けました
                </h2>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#f2f6ef] border border-[#d6e3cf] rounded-full text-xs text-[#374d2e] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#47623d]" />
                  <span>
                    {submissionResult?.mailDispatched
                      ? 'info@nagomi-zaidan.or.jp へ通知メール送信完了（台帳記録済）'
                      : '当財団の受付台帳へ正常記録完了（事務局にて順次確認いたします）'}
                  </span>
                </div>

                {/* Official Receipt Number & Note */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg mx-auto">
                  お問い合わせいただき誠にありがとうございます。<br />
                  ご入力いただいた内容は当財団の受付台帳
                  {submissionResult?.savedToSheet && submissionResult?.submissionId && (
                    <>
                      （受付番号:{' '}
                      <span className="font-mono font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                        {submissionResult.submissionId}
                      </span>
                      ）
                    </>
                  )}
                  へ安全に記録されました。事務局にて内容を確認の上、担当者よりご連絡を差し上げます。
                </p>
              </div>

              {/* Transmission Summary Card (Receipt details preserved) */}
              <div className="bg-[#faf9f5] border border-[#e7e4dc] rounded-lg p-4 sm:p-5 text-xs text-stone-700 space-y-2.5">
                <div className="font-bold text-stone-900 pb-2 border-b border-[#e7e4dc] flex items-center justify-between">
                  <span>送信内容の控え</span>
                  {submissionResult?.savedToSheet && submissionResult?.submissionId && (
                    <span className="font-mono text-[11px] text-stone-600 font-semibold">
                      受付番号: {submissionResult.submissionId}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                  <span className="text-stone-500 font-medium">送信先</span>
                  <span className="sm:col-span-2 font-mono font-semibold text-[#47623d]">
                    {FOUNDATION_INFO_EMAIL}（当財団事務局窓口）
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                  <span className="text-stone-500 font-medium">お名前</span>
                  <span className="sm:col-span-2 font-semibold text-stone-900">{formData.name}</span>
                </div>
                {formData.organization && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                    <span className="text-stone-500 font-medium">ご所属・団体名</span>
                    <span className="sm:col-span-2 text-stone-800">{formData.organization}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                  <span className="text-stone-500 font-medium">返信先メールアドレス</span>
                  <span className="sm:col-span-2 font-mono text-stone-800">{formData.email}</span>
                </div>
                {formData.phone && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                    <span className="text-stone-500 font-medium">お電話番号</span>
                    <span className="sm:col-span-2 text-stone-800">{formData.phone}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                  <span className="text-stone-500 font-medium">お問い合わせ項目</span>
                  <span className="sm:col-span-2 text-stone-800">
                    {CONTACT_CATEGORY_OPTIONS.find((c) => c.value === formData.category)?.label || formData.category}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 pt-1 border-t border-stone-200">
                  <span className="text-stone-500 font-medium">お問い合わせ内容</span>
                  <span className="sm:col-span-2 text-stone-800 whitespace-pre-wrap leading-relaxed">
                    {formData.message}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
                >
                  新しく問い合わせる
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form View */
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-[#e7e4dc] p-6 sm:p-8 shadow-xs space-y-5"
              noValidate
            >
              {/* Anti-Bot Honeypot Field (Hidden from real users, traps automated scrapers) */}
              <div
                className="opacity-0 absolute -z-10 select-none pointer-events-none h-0 w-0 overflow-hidden"
                aria-hidden="true"
                tabIndex={-1}
              >
                <label htmlFor="hp_trap">Do not fill this field</label>
                <input
                  type="text"
                  id="hp_trap"
                  name="hp_trap"
                  value={formData.hp_trap}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Error & Communication Distinction Banner */}
              {errorMsg && (
                <>
                  {errorKind === 'unknown_network' && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 text-xs space-y-3">
                      <div className="flex items-start gap-2.5 text-amber-900 font-bold">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-[13px] font-bold">【通信結果不明：受付状況の確認と二重送信防止について】</p>
                          <p className="text-[11px] font-normal text-amber-800 mt-0.5">{errorMsg}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-amber-200/80 text-[11px] text-stone-700 space-y-2 leading-relaxed">
                        <div className="p-2.5 bg-white/80 rounded border border-amber-200/60 text-stone-800">
                          <p className="font-bold text-amber-900 mb-1">
                            当財団の受付台帳へ正常に届いている可能性がございます
                          </p>
                          <p className="text-stone-600">
                            通信環境の切断や一時的なタイムアウトにより、ブラウザ側で完了確認通知を受信できませんでした。
                            同一内容の二重送信を防ぐため、まずはしばらくお待ちいただくか、下記の「受付状況を再確認・再試行する」をお試しください。
                            （同一のリクエスト番号 <span className="font-mono font-semibold text-stone-800">[{clientRequestId}]</span> で照合されるため、重複登録されることはありません）
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                          <span className="text-stone-500">
                            お急ぎの場合の代替窓口：
                          </span>
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#47623d] hover:bg-[#374d2e] text-white rounded font-bold transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>メールソフトで直接送信する（代替手段）</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {errorKind === 'uuid_conflict' && (
                    <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-stone-800 text-xs space-y-2.5">
                      <div className="flex items-start gap-2.5 text-sky-900 font-bold">
                        <RefreshCw className="w-4 h-4 shrink-0 text-sky-700 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-[13px] font-bold">【リクエスト識別番号の競合（UUID競合）を検知しました】</p>
                          <p className="text-[11px] font-normal text-sky-800 mt-0.5">{errorMsg}</p>
                        </div>
                      </div>
                      <div className="p-2.5 bg-white/90 rounded border border-sky-200/70 text-[11px] text-stone-700 space-y-1">
                        <p className="font-semibold text-sky-950">
                          新しいリクエスト識別番号を発行しました
                        </p>
                        <p className="text-stone-600">
                          同一識別番号での重複を避けるため、新番号（<span className="font-mono text-stone-800 font-semibold">{clientRequestId}</span>）を自動生成しました。入力内容はそのまま保持されていますので、改めて「新しい識別番号で送信する」ボタンを押してください。
                        </p>
                      </div>
                    </div>
                  )}

                  {errorKind === 'gas_rejection' && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-stone-800 text-xs space-y-2.5">
                      <div className="flex items-start gap-2.5 text-rose-900 font-bold">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-700 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-[13px] font-bold">【受付サーバーからのご案内（入力拒否・制限）】</p>
                          <p className="text-[11px] font-normal text-rose-800 mt-0.5">{errorMsg}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-rose-200/80 text-[11px] text-stone-600 space-y-2">
                        <p>
                          ※受付台帳への記録は行われておりません。入力内容を修正していただくか、解消しない場合は公式メールアドレスまで直接お問い合わせください。
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#47623d] hover:bg-[#374d2e] text-white rounded font-bold transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>メールソフトで直接送信する</span>
                          </a>
                          <span className="text-stone-500 font-mono">
                            （宛先: {FOUNDATION_INFO_EMAIL}）
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {errorKind === 'validation_client' && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 text-xs">
                      <div className="flex items-start gap-2.5 text-amber-900 font-bold">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                        <span>{errorMsg}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-stone-900 mb-1">
                  お名前 <span className="text-[#c4683f]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="例：山田 太郎"
                  disabled={isSubmitting || !isEndpointReady}
                  className="w-full px-3.5 py-2 text-sm border border-[#d5d0c3] rounded-lg focus:ring-2 focus:ring-[#47623d] focus:border-[#47623d] outline-none disabled:bg-stone-100"
                />
              </div>

              {/* Organization */}
              <div>
                <label htmlFor="organization" className="block text-xs font-bold text-stone-900 mb-1">
                  ご所属団体・法人名 <span className="text-stone-400 font-normal">（任意）</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="例：特定非営利活動法人 ○○支援ネットワーク"
                  disabled={isSubmitting || !isEndpointReady}
                  className="w-full px-3.5 py-2 text-sm border border-[#d5d0c3] rounded-lg focus:ring-2 focus:ring-[#47623d] focus:border-[#47623d] outline-none disabled:bg-stone-100"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-stone-900 mb-1">
                  メールアドレス <span className="text-[#c4683f]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="例：example@domain.jp"
                  disabled={isSubmitting || !isEndpointReady}
                  className="w-full px-3.5 py-2 text-sm border border-[#d5d0c3] rounded-lg focus:ring-2 focus:ring-[#47623d] focus:border-[#47623d] outline-none disabled:bg-stone-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-stone-900 mb-1">
                  電話番号 <span className="text-stone-400 font-normal">（任意）</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="例：03-0000-0000"
                  disabled={isSubmitting || !isEndpointReady}
                  className="w-full px-3.5 py-2 text-sm border border-[#d5d0c3] rounded-lg focus:ring-2 focus:ring-[#47623d] focus:border-[#47623d] outline-none disabled:bg-stone-100"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-xs font-bold text-stone-900 mb-1">
                  お問い合わせ項目 <span className="text-[#c4683f]">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={isSubmitting || !isEndpointReady}
                  className="w-full px-3.5 py-2 text-sm border border-[#d5d0c3] rounded-lg bg-white focus:ring-2 focus:ring-[#47623d] focus:border-[#47623d] outline-none disabled:bg-stone-100"
                >
                  {CONTACT_CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-stone-900 mb-1">
                  お問い合わせ内容 <span className="text-[#c4683f]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="お問い合わせ内容を具体的にご記入ください"
                  disabled={isSubmitting || !isEndpointReady}
                  className="w-full px-3.5 py-2 text-sm border border-[#d5d0c3] rounded-lg focus:ring-2 focus:ring-[#47623d] focus:border-[#47623d] outline-none disabled:bg-stone-100"
                />
              </div>

              {/* Agreement */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    disabled={isSubmitting || !isEndpointReady}
                    className="mt-0.5 rounded text-[#47623d] focus:ring-[#47623d]"
                  />
                  <span>
                    当法人の{' '}
                    <button
                      type="button"
                      onClick={() => openPolicyModal('privacy')}
                      className="text-[#47623d] underline hover:text-[#32452b] font-bold"
                    >
                      個人情報保護方針（プライバシーポリシー）
                    </button>
                    {' '}に同意の上、送信します。
                  </span>
                </label>
              </div>

              {/* Submit Button & Destination Notice */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !isEndpointReady}
                  className="w-full sm:w-auto px-8 py-3 bg-[#47623d] hover:bg-[#374d2e] disabled:bg-stone-400 text-white font-medium text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{FOUNDATION_INFO_EMAIL} へ送信中...</span>
                    </>
                  ) : !isEndpointReady ? (
                    <span>お問い合わせ受付休止中（公式メールをご利用ください）</span>
                  ) : errorKind === 'unknown_network' ? (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>受付状況を再確認・再試行する</span>
                    </>
                  ) : errorKind === 'uuid_conflict' ? (
                    <>
                      <Send className="w-4 h-4" />
                      <span>新しい識別番号で送信する</span>
                    </>
                  ) : errorKind === 'gas_rejection' ? (
                    <>
                      <Send className="w-4 h-4" />
                      <span>入力内容を修正して送信する</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>入力内容を送信する</span>
                    </>
                  )}
                </button>
                {isEndpointReady && (
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    ※「入力内容を送信する」ボタンを押すと、入力された内容が当財団事務局（
                    <span className="font-mono text-[#47623d] font-semibold">{FOUNDATION_INFO_EMAIL}</span>
                    ）へ安全に記録・送信されます。
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
