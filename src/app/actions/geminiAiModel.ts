"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const getKey = () => {
  if (!apiKey) {
    throw new Error("Api key not found");
  }
  return apiKey;
};
const genAI = new GoogleGenerativeAI(getKey());

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function aiContentGeneration(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const aiResponse = JSON.parse(result.response.text());
  return aiResponse;
}
