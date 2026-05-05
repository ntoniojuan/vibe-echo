import { readGenerativeAiForGemini } from "@/lib/gemini/readGenerativeAiForGemini";
import { readGeminiModelId } from "@/lib/gemini/readGeminiModelId";
import { retryGeminiRequest } from "@/lib/gemini/retryGeminiRequest";
import { runSerializedGeminiRequest } from "@/lib/gemini/runSerializedGeminiRequest";

type GeminiJsonGenerationInput = {
  systemInstruction: string;
  userText: string;
};

export const callGeminiJsonGeneration = async (
  input: GeminiJsonGenerationInput,
): Promise<string> => {
  return retryGeminiRequest(async () =>
    runSerializedGeminiRequest(async () => {
      const genAi = readGenerativeAiForGemini();
      const model = genAi.getGenerativeModel({
        model: readGeminiModelId(),
        systemInstruction: input.systemInstruction,
        generationConfig: {
          responseMimeType: "application/json",
        },
      });
      const result = await model.generateContent(input.userText);
      const text = result.response.text();
      if (!text?.trim()) {
        throw new Error("Gemini returned an empty message.");
      }
      return text;
    }),
  );
};
