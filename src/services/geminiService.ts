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
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key tidak ditemukan. Silakan set GEMINI_API_KEY di file .env",
    );
  }

  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-001",
    "gemini-2.5-pro",
  ];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_INSTRUCTION}\n\nTopic: ${topic}\n\nGenerate a complete lesson in JSON format.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No response text from AI");
      }

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }

      const lessonData = JSON.parse(jsonMatch[0]) as LessonData;

      if (
        !lessonData.lesson_title ||
        !lessonData.vocabulary ||
        !lessonData.quiz
      ) {
        throw new Error("Invalid lesson data structure");
      }

      return lessonData;
    } catch (error: any) {
      const errorMsg = error?.message || String(error);

      if (errorMsg.includes("404") || errorMsg.includes("NOT_FOUND")) {
        continue;
      }

      if (errorMsg.includes("503") || errorMsg.includes("UNAVAILABLE")) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }

      throw error;
    }
  }

  throw new Error(
    "Gagal membuat pelajaran. Silakan coba lagi atau cek koneksi internet Anda.",
  );
}
