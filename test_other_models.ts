import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function main() {
  const models = ["gemini-2.5-flash", "gemini-1.5-flash"];
  for (const m of models) {
    try {
      console.log(`Testing model ${m}...`);
      const response = await ai.models.generateContent({
        model: m,
        contents: "Respond with SUCCESS if you can hear me.",
      });
      console.log(`Model ${m} response:`, response.text);
    } catch (err: any) {
      console.error(`Model ${m} failed:`, err.message || err);
    }
  }
}

main();
