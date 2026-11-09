/**
 * Resolves a public asset path (images, documents, PDFs) to be compatible with:
 * 1) GitHub Pages project URL with subdirectory: https://<org>.github.io/<repo>/
 * 2) Custom domain apex / root: https://nagomi-zaidan.or.jp/
 * 3) Local development preview server (localhost:3000)
 */
export function getAssetUrl(path?: string | null): string {
  if (!path) return '';

  // Preserve external protocols, data URLs, anchor hashes, and mailto/tel links
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }

  // import.meta.env.BASE_URL is injected by Vite at compile time based on vite.config.ts base setting
  const base = import.meta.env.BASE_URL || './';

  // If path is already prefixed with base, return as is
  if (base !== './' && path.startsWith(base)) {
    return path;
  }

  // Strip leading relative prefix (./) or absolute slash (/) to normalize
  let cleanPath = path;
  if (cleanPath.startsWith('./')) {
    cleanPath = cleanPath.slice(2);
  } else if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }

  if (base === './') {
    return `./${cleanPath}`;
  }

  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
}
