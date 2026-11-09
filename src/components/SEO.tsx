import React, { useEffect } from 'react';
import { useFoundation } from '../context/FoundationContext';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path = ''
}) => {
  const { currentFullName, foundation } = useFoundation();

  const siteTitle = title ? `${title} | ${currentFullName}` : `${currentFullName} 公式サイト`;
  const defaultDesc = `精神的な困難等により支援を必要とする方々の自立と社会参加を支える民間支援活動への助成と基盤強化を行う、${currentFullName}の公式サイトです。`;
  const metaDescription = description || defaultDesc;

  useEffect(() => {
    // Document Title
    document.title = siteTitle;

    // Meta Description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', metaDescription);

    // OpenGraph
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute('content', siteTitle);

    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) ogDescTag.setAttribute('content', metaDescription);

    // JSON-LD Structured Data
    const schemaOrgId = 'foundation-jsonld';
    let scriptTag = document.getElementById(schemaOrgId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaOrgId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "NGO",
      "name": currentFullName,
      "alternateName": foundation.nameCore,
      "description": foundation.purpose,
      "foundingDate": foundation.establishedDate,
      "founder": {
        "@type": "Organization",
        "name": foundation.founder
      },
      "taxID": foundation.corporateNumber13,
      "address": {
        "@type": "PostalAddress",
        "postalCode": "100-0004",
        "addressRegion": "東京都",
        "addressLocality": "千代田区大手町",
        "streetAddress": "2-2-1 新大手町ビル702",
        "addressCountry": "JP"
      },
      "areaServed": {
        "@type": "Country",
        "name": foundation.activityArea
      }
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [siteTitle, metaDescription, currentFullName, foundation]);

  return null;
};
