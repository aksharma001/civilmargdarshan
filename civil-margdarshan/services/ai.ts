import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateStudyAdvice = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment to use the AI Tutor.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are "Margdarshan AI", a helpful and encouraging exam counselor for Rajasthan government exams (RPSC, REET, RSMSSB, Police, Patwari). 
    Your goal is to help students with study plans, syllabus summaries, and motivation. 
    Keep answers concise, structured (using bullet points), and polite. 
    If asked about specific dates or notifications, advise them to check the official website as you are an AI.
    Focus on Rajasthan-specific context where applicable.`;

    const response = await ai.models.generateContent({
      model,
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text || "I couldn't generate a response at this time. Please try again.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Sorry, I'm having trouble connecting to the knowledge base right now. Please try again later.";
  }
};