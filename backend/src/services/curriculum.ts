export interface Theme {
  name_de: string;
  name_ar: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  context: string;
}

export const CURRICULUM: Theme[] = [
  { name_de: 'Begrüßungen', name_ar: 'التحيات', difficulty: 'A1', context: 'Basic greetings and farewells used every day' },
  { name_de: 'Vorstellung', name_ar: 'التعريف بالنفس', difficulty: 'A1', context: 'Introducing yourself: name, country, age' },
  { name_de: 'Zahlen 1–10', name_ar: 'الأرقام', difficulty: 'A1', context: 'Numbers one to ten' },
  { name_de: 'Familie', name_ar: 'العائلة', difficulty: 'A1', context: 'Family members and relationships' },
  { name_de: 'Farben', name_ar: 'الألوان', difficulty: 'A1', context: 'Basic colors' },
  { name_de: 'Wochentage', name_ar: 'أيام الأسبوع', difficulty: 'A1', context: 'Days of the week' },
  { name_de: 'Wetter', name_ar: 'الطقس', difficulty: 'A1', context: 'Weather descriptions and seasons' },
  { name_de: 'Essen & Trinken', name_ar: 'الأكل والشرب', difficulty: 'A1', context: 'Common food and drink items' },
  { name_de: 'Tiere', name_ar: 'الحيوانات', difficulty: 'A1', context: 'Common animals' },
  { name_de: 'Im Café', name_ar: 'في المقهى', difficulty: 'A2', context: 'Ordering drinks and snacks at a café' },
  { name_de: 'Im Restaurant', name_ar: 'في المطعم', difficulty: 'A2', context: 'Ordering food at a restaurant' },
  { name_de: 'Körper', name_ar: 'الجسم', difficulty: 'A2', context: 'Body parts' },
  { name_de: 'Kleidung', name_ar: 'الملابس', difficulty: 'A2', context: 'Clothing and fashion items' },
  { name_de: 'Zuhause', name_ar: 'في البيت', difficulty: 'A2', context: 'Rooms and furniture at home' },
  { name_de: 'Einkaufen', name_ar: 'التسوق', difficulty: 'A2', context: 'Shopping for goods and prices' },
  { name_de: 'Transport', name_ar: 'المواصلات', difficulty: 'A2', context: 'Getting around: bus, taxi, metro' },
  { name_de: 'Berufe', name_ar: 'المهن', difficulty: 'A2', context: 'Jobs and professions' },
  { name_de: 'Gefühle', name_ar: 'المشاعر', difficulty: 'A2', context: 'Emotions and feelings' },
  { name_de: 'Zeit & Uhrzeit', name_ar: 'الوقت', difficulty: 'A2', context: 'Telling the time and schedules' },
  { name_de: 'Gesundheit', name_ar: 'الصحة', difficulty: 'B1', context: 'Health, illness and visiting a doctor' },
  { name_de: 'Reisen', name_ar: 'السفر', difficulty: 'B1', context: 'Travel, airports and tourism' },
  { name_de: 'Arbeit & Büro', name_ar: 'العمل والمكتب', difficulty: 'B1', context: 'Office life and professional language' },
  { name_de: 'Sport', name_ar: 'الرياضة', difficulty: 'B1', context: 'Sports and physical activities' },
  { name_de: 'Technologie', name_ar: 'التكنولوجيا', difficulty: 'B1', context: 'Technology, smartphones and internet' },
  { name_de: 'Natur & Umwelt', name_ar: 'الطبيعة والبيئة', difficulty: 'B1', context: 'Nature, environment and climate' },
  { name_de: 'Arabische Küche', name_ar: 'المطبخ العربي', difficulty: 'B1', context: 'Traditional Arabic dishes and cuisine' },
  { name_de: 'Schule & Studium', name_ar: 'التعليم', difficulty: 'B2', context: 'Education, university and studying' },
  { name_de: 'Arabische Kultur', name_ar: 'الثقافة العربية', difficulty: 'B2', context: 'Arab customs, traditions and values' },
  { name_de: 'Medien & Nachrichten', name_ar: 'الإعلام', difficulty: 'B2', context: 'Media, news and communication' },
  { name_de: 'Sprichwörter & Weisheiten', name_ar: 'الأمثال والحكم', difficulty: 'C1', context: 'Famous Arabic proverbs and their meanings' },
];
