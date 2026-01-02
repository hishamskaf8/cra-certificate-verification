
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const editImageWithGemini = async (base64Image: string, prompt: string, mimeType: string = 'image/jpeg') => {
  if (!API_KEY) throw new Error("API Key not found");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Apply the following edit to this document/image: ${prompt}. Ensure the final output remains official looking and maintains high quality.`,
          },
        ],
      },
    });

    let imageUrl = "";
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    return imageUrl || null;
  } catch (error) {
    console.error("Gemini Image Editing Error:", error);
    throw error;
  }
};
