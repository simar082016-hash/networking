
import { GoogleGenAI } from "@google/genai";

// Fix: Initialized the client using process.env.API_KEY directly as per SDK requirements
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGemini = async (question: string, context: string) => {
  try {
    // Fix: Moved tutor persona and lesson context to systemInstruction to separate logic from the user question
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `You are an expert Salesforce IAM tutor. Context of current lesson: ${context}. Provide a concise, helpful answer that simplifies complex concepts. Use Salesforce-specific terminology where appropriate.`,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    // Fix: Directly access the .text property as it is a getter, not a method
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};
