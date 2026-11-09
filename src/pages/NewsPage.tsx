import React, { useState } from 'react';
import { useFoundation } from '../context/FoundationContext';
import newsData from '../content/news.json';
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2, Building } from 'lucide-react';

interface NewsPageProps {
  selectedNewsId: string | null;
  setSelectedNewsId: (id: string | null) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  selectedNewsId,
  setSelectedNewsId,
}) => {
  const { currentFullName, foundation } = useFoundation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', '助成公募', 'お知らせ', '法人設立'];

  const selectedArticle = selectedNewsId
    ? newsData.find((item) => item.id === selectedNewsId)
    : null;

  const filteredNews =
    selectedCategory === 'all'
      ? newsData
      : selectedCategory === 'お知らせ'
      ? newsData.filter((item) => item.category === 'お知らせ' || item.category === '助成公募')
      : newsData.filter((item) => item.category === selectedCategory);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        <button
          type="button"
          onClick={() => setSelectedNewsId(null)}
          className="text-xs font-semibold text-[#47623d] hover:text-[#32452b] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>お知らせ一覧へ戻る</span>
        </button>

        <article className="bg-white rounded-xl border border-[#e7e4dc] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#e7e4dc] pb-6 space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-stone-500">
              <time dateTime={selectedArticle.date} className="font-mono">{selectedArticle.date}</time>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#47623d]">{selectedArticle.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#22211e] tracking-tight font-serif">
              {selectedArticle.title}
            </h1>
          </div>

          <div className="prose max-w-none text-sm text-stone-700 leading-relaxed space-y-4">
            <p className="font-medium text-stone-900 bg-[#faf9f5] p-4 rounded-lg border border-[#e7e4dc]">
              {selectedArticle.summary}
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {selectedArticle.content}
            </p>
          </div>

          <div className="pt-8 border-t border-[#e7e4dc] text-xs text-stone-500 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span>発信元：{currentFullName} 事務局</span>
            </div>
            <div>
              <span className="text-stone-400">主たる事務所：</span>
              <div className="whitespace-pre-line text-stone-600 mt-0.5 leading-relaxed">
                {foundation.address}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#e7e4dc] pb-8">
        <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
          NEWS & UPDATES
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22211e] tracking-tight font-serif">
          お知らせ
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          <span className="inline-block">{currentFullName}からの最新のお知らせ、</span>
          <span className="inline-block">事業公募、法人運営に関する情報をお届けします。</span>
        </p>
      </div>

      {/* Category filter tabs (Accessible functional buttons per frontend design skill) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#f5f4ef] rounded-lg max-w-fit border border-[#e7e4dc]" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedCategory === cat
                ? 'bg-[#47623d] text-white shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {cat === 'all' ? 'すべて' : cat}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="divide-y divide-[#ece9e1] bg-white rounded-xl border border-[#e7e4dc] shadow-xs overflow-hidden">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            onClick={() => setSelectedNewsId(item.id)}
            className="p-5 sm:p-6 hover:bg-[#faf9f5] transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
          >
            <div className="flex items-center gap-3 shrink-0 text-xs text-stone-500">
              <time dateTime={item.date} className="font-mono">{item.date}</time>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-[#47623d]">{item.category}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-stone-900 group-hover:text-[#47623d] transition-colors">
                {item.title}
              </h2>
              <p className="mt-1 text-xs text-stone-600 line-clamp-2">
                {item.summary}
              </p>
            </div>
            <div className="hidden sm:block shrink-0">
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#47623d] group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
