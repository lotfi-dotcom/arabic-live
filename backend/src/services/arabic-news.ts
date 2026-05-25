import Parser from 'rss-parser';

const parser = new Parser({ timeout: 10000 });

const FEEDS = [
  'https://www.aljazeera.net/xml/rss/all.xml',
  'https://feeds.bbci.co.uk/arabic/rss.xml',
  'https://rss.dw.com/rdf/rss-ar-all',
];

export interface ArabicHeadline {
  title: string;
  source: string;
  url: string;
}

export async function fetchArabicHeadlines(): Promise<ArabicHeadline[]> {
  const all: ArabicHeadline[] = [];
  const sources = ['الجزيرة', 'BBC عربي', 'DW عربي'];

  for (let i = 0; i < FEEDS.length; i++) {
    try {
      const feed = await parser.parseURL(FEEDS[i]);
      const items = feed.items.slice(0, 8);
      for (const item of items) {
        if (!item.title) continue;
        // Only keep items with Arabic characters
        if (!/[؀-ۿ]/.test(item.title)) continue;
        all.push({
          title: item.title.trim(),
          source: sources[i],
          url: item.link ?? '',
        });
      }
    } catch {
      // continue to next feed
    }
  }

  return all;
}
