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
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Respond with the word SUCCESS if you can hear me.",
    });
    console.log("Response text:", response.text);
  } catch (err) {
    console.error("Error calling Gemini API:", err);
  }
}

main();
