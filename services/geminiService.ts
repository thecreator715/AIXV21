import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  // Always create a new instance to ensure we capture any API key updates
  // from the window.aistudio.openSelectKey() flow
  const apiKey = process.env.API_KEY || ''; 
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async (history: {role: string, parts: {text: string}[]}[] = []) => {
  const ai = getGenAI();
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are AIX, an advanced intelligence protocol assistant. You are concise, technical, and helpful. You speak in a futuristic, slightly robotic but friendly tone.',
    },
    history: history.map(h => ({
        role: h.role,
        parts: h.parts
    }))
  });
  return chatSession;
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "System: No response data received.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "System Error: Communication link failed. Please check connection.";
  }
};

export const generateVideo = async (prompt: string): Promise<string> => {
  const ai = getGenAI();
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    // Polling loop
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5 seconds
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("No video URI generated.");
    }

    // Fetch the video bytes
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!response.ok) throw new Error("Failed to download video.");
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Video Generation Error:", error);
    throw error;
  }
};
