import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface WordBreakdown {
  arabic: string;
  transliteration: string;
  meaning_de: string;
  root: string;
  root_meaning: string;
  type: string;
}

export interface LessonData {
  headline: string;
  source: string;
  translation_de: string;
  words: WordBreakdown[];
  grammar_tip: string;
  difficulty: string;
  cultural_note: string;
}

export async function breakdownHeadline(headline: string, source: string): Promise<LessonData> {
  const prompt = `Du bist ein Arabisch-Lehrer für deutschsprachige Anfänger und Fortgeschrittene.

Analysiere diese arabische Nachrichtenüberschrift und gib eine vollständige Lernaufschlüsselung:

Überschrift: ${headline}
Quelle: ${source}

Antworte NUR mit einem validen JSON-Objekt (kein Text davor oder danach):
{
  "headline": "${headline}",
  "source": "${source}",
  "translation_de": "Vollständige deutsche Übersetzung",
  "words": [
    {
      "arabic": "arabisches Wort",
      "transliteration": "Aussprache auf Latein z.B. al-ra'ees",
      "meaning_de": "deutsche Bedeutung",
      "root": "3-Buchstaben-Wurzel z.B. ر-أ-س",
      "root_meaning": "Was die Wurzel bedeutet",
      "type": "Substantiv/Verb/Adjektiv/Artikel/Präposition"
    }
  ],
  "grammar_tip": "Ein interessanter Grammatikhinweis auf Deutsch (max 2 Sätze)",
  "difficulty": "A1 oder A2 oder B1 oder B2 oder C1",
  "cultural_note": "Kurzer kultureller Kontext auf Deutsch (optional, max 1 Satz)"
}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in response');

  return JSON.parse(jsonMatch[0]) as LessonData;
}
