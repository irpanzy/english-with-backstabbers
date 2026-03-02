import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `Anda adalah desainer kurikulum bahasa Inggris yang kreatif. Saya sedang membangun aplikasi web belajar bahasa Inggris khusus pemula bernama "English With Backstabbers". Konsep aplikasinya menyerupai Duolingo: mengandalkan micro-learning, gamifikasi, dan soal kuis interaktif.

Tugas Anda adalah merancang modul pelajaran singkat setiap kali saya memberikan topik. Karena aplikasi ini ditujukan untuk pemula mutlak, gunakan bahasa penjelasan yang santai, mudah dipahami, dan relevan dengan percakapan sehari-hari.

Agar data Anda mudah diproses ke dalam database dan disajikan oleh frontend, setiap respons harus selalu dalam format JSON murni tanpa teks pengantar atau penutup. Format JSON harus memiliki struktur berikut:

lesson_title: Judul pelajaran.
objective: Apa yang akan dipelajari di modul ini (maksimal 2 kalimat).
vocabulary: Array berisi kata/frasa baru (berisi objek en untuk bahasa Inggris dan id untuk bahasa Indonesia).
quiz: Array berisi 3-5 pertanyaan pilihan ganda. Setiap objek pertanyaan harus memiliki question, options (array berisi 4 pilihan), correct_answer, dan explanation (penjelasan singkat kenapa jawaban tersebut benar).`;

export interface VocabularyItem {
  en: string;
  id: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface LessonData {
  lesson_title: string;
  objective: string;
  vocabulary: VocabularyItem[];
  quiz: QuizQuestion[];
}

export async function generateLesson(topic: string): Promise<LessonData> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: topic,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          lesson_title: { type: Type.STRING },
          objective: { type: Type.STRING },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                en: { type: Type.STRING },
                id: { type: Type.STRING }
              },
              required: ["en", "id"]
            }
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correct_answer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correct_answer", "explanation"]
            }
          }
        },
        required: ["lesson_title", "objective", "vocabulary", "quiz"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as LessonData;
}
