import Anthropic from '@anthropic-ai/sdk';
import { Theme } from './curriculum';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface WordCard {
  arabic: string;
  transliteration: string;
  meaning_de: string;
  example_arabic: string;
  example_transliteration: string;
  example_de: string;
  root: string;
  root_meaning: string;
  type: string;
}

export interface DialogLine {
  speaker: 'A' | 'B';
  name: string;
  arabic: string;
  transliteration: string;
  meaning_de: string;
}

export interface QuizData {
  arabic: string;
  question_de: string;
  options: string[];
  correct: number;
}

export interface EpisodeData {
  theme: string;
  theme_arabic: string;
  difficulty: string;
  words: WordCard[];
  dialog: DialogLine[];
  quiz: QuizData;
  grammar_tip: string;
  cultural_note: string;
}

export async function generateEpisode(theme: Theme): Promise<EpisodeData> {
  const prompt = `Du bist ein brillanter Arabisch-Lehrer für deutschsprachige Lernende auf einem YouTube-Lernkanal.

Erstelle eine vollständige, spannende Lerneinheit zum Thema "${theme.name_de}" (${theme.name_ar}) auf Niveau ${theme.difficulty}.
Kontext: ${theme.context}

Antworte NUR mit einem validen JSON-Objekt (kein Text davor oder danach):
{
  "theme": "${theme.name_de}",
  "theme_arabic": "${theme.name_ar}",
  "difficulty": "${theme.difficulty}",
  "words": [
    {
      "arabic": "arabisches Wort",
      "transliteration": "Aussprache lateinisch z.B. mar-ḥa-ban",
      "meaning_de": "Bedeutung auf Deutsch",
      "example_arabic": "Kurzer Beispielsatz auf Arabisch",
      "example_transliteration": "Aussprache des Satzes",
      "example_de": "Deutsche Übersetzung des Satzes",
      "root": "3-Buchstaben-Wurzel z.B. ر-ح-ب",
      "root_meaning": "Was die Wurzel grundlegend bedeutet",
      "type": "Substantiv oder Verb oder Adjektiv oder Partikel"
    }
  ],
  "dialog": [
    {
      "speaker": "A",
      "name": "Ahmad",
      "arabic": "Arabischer Text",
      "transliteration": "Lateinische Aussprache",
      "meaning_de": "Deutsche Übersetzung"
    }
  ],
  "quiz": {
    "arabic": "Eines der 5 Lernwörter",
    "question_de": "Was bedeutet [Wort] auf Deutsch?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 1
  },
  "grammar_tip": "Ein konkreter, interessanter Grammatikhinweis (max 2 kurze Sätze)",
  "cultural_note": "Ein faszinierender kultureller Fakt (max 2 Sätze)"
}

Regeln:
- Genau 5 thematisch passende Wörter, progressiv vom einfachsten zum schwersten
- Dialog: 5-6 natürliche Zeilen, abwechselnd A und B (Ahmad und Sara)
- Quiz: Test eines der 5 Wörter, 4 plausible Optionen, correct = Index der richtigen Antwort (0-3)
- Alle Wörter und Sätze zum Thema "${theme.name_de}" passend
- Niveau ${theme.difficulty} strikt einhalten`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in Claude response');
  return JSON.parse(jsonMatch[0]) as EpisodeData;
}
