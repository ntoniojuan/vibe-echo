import { GoogleGenerativeAI } from "@google/generative-ai";

let cachedClient: GoogleGenerativeAI | undefined;

export const readGenerativeAiForGemini = (): GoogleGenerativeAI => {
  if (cachedClient) {
    return cachedClient;
  }
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not configured.");
  }
  cachedClient = new GoogleGenerativeAI(apiKey);
  return cachedClient;
};
