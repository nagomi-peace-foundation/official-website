/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FoundationProvider } from './context/FoundationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { PolicyModal } from './components/PolicyModal';
import { DocumentPreviewModal, PreviewDocumentInfo } from './components/DocumentPreviewModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { GrantsPage } from './pages/GrantsPage';
import { DisclosuresPage } from './pages/DisclosuresPage';
import { DonationsPage } from './pages/DonationsPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';

const AppContent: React.FC = () => {
  // Helper to extract clean tab name from hash or query
  const getTabFromUrl = (): string => {
    const rawHash = window.location.hash.replace('#', '').trim();
    if (rawHash === 'officers' || rawHash === 'about-officers') {
      return 'about';
    }
    if (
      rawHash &&
      [
        'home',
        'about',
        'programs',
        'grants',
        'disclosures',
        'donations',
        'news',
        'contact',
        'policies',
      ].includes(rawHash)
    ) {
      return rawHash;
    }
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (
      tabParam &&
      [
        'home',
        'about',
        'programs',
        'grants',
        'disclosures',
        'donations',
        'news',
        'contact',
        'policies',
      ].includes(tabParam)
    ) {
      return tabParam;
    }
    return 'home';
  };

  const [currentTab, setCurrentTab] = useState<string>(() => getTabFromUrl());
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [activePolicyModalId, setActivePolicyModalId] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<PreviewDocumentInfo | null>(null);

  // Sync with URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromUrl();
      setCurrentTab(tab);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ensure page always starts from the top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentTab]);

  const handleSetCurrentTab = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSetPreviewDoc = (doc: string | PreviewDocumentInfo | null) => {
    if (!doc) {
      setPreviewDoc(null);
    } else if (typeof doc === 'string') {
      setPreviewDoc({ title: doc });
    } else {
      setPreviewDoc(doc);
    }
  };

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'home':
        return 'トップ';
      case 'about':
        return '財団について（概要・役員・理念・組織図）';
      case 'programs':
        return '事業紹介';
      case 'grants':
        return '助成事業（公募要項・選考プロセス・FAQ）';
      case 'disclosures':
        return '情報公開（決算・事業報告・定款【抜粋】）';
      case 'donations':
        return 'ご支援のお願い（寄附）';
      case 'news':
        return 'お知らせ';
      case 'contact':
        return 'お問い合わせ';
      case 'policies':
        return 'コンプライアンス・基本方針';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#22211e] font-sans selection:bg-[#47623d] selection:text-white">
      {/* Dynamic SEO & JSON-LD updates */}
      <SEO title={getPageTitle(currentTab)} path={`/${currentTab}`} />

      {/* Accessible Header with Text Size Switcher & Navigation */}
      <Header currentTab={currentTab} setCurrentTab={handleSetCurrentTab} />

      {/* Main Content Area (Fully public, no authentication required) */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-hidden">
        {currentTab === 'home' && (
          <HomePage
            setCurrentTab={handleSetCurrentTab}
            setSelectedNewsId={setSelectedNewsId}
            setPreviewDoc={handleSetPreviewDoc}
          />
        )}
        {currentTab === 'about' && <AboutPage setPreviewDoc={handleSetPreviewDoc} />}
        {currentTab === 'programs' && <ProgramsPage setCurrentTab={handleSetCurrentTab} />}
        {currentTab === 'grants' && <GrantsPage setPreviewDoc={handleSetPreviewDoc} />}
        {currentTab === 'disclosures' && (
          <DisclosuresPage
            setPreviewDoc={handleSetPreviewDoc}
            setCurrentTab={handleSetCurrentTab}
          />
        )}
        {currentTab === 'donations' && <DonationsPage setCurrentTab={handleSetCurrentTab} />}
        {currentTab === 'news' && (
          <NewsPage
            selectedNewsId={selectedNewsId}
            setSelectedNewsId={setSelectedNewsId}
          />
        )}
        {currentTab === 'contact' && (
          <ContactPage openPolicyModal={setActivePolicyModalId} />
        )}
        {currentTab === 'policies' && <PolicyPage />}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={handleSetCurrentTab}
        openPolicyModal={setActivePolicyModalId}
      />

      {/* Policy View Modal */}
      <PolicyModal
        policyId={activePolicyModalId}
        onClose={() => setActivePolicyModalId(null)}
      />

      {/* Document PDF Preview Modal */}
      <DocumentPreviewModal
        document={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <FoundationProvider>
      <AppContent />
    </FoundationProvider>
  );
}
