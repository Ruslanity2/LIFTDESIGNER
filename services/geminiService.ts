import { GoogleGenAI } from "@google/genai";
import { ElevatorConfig } from "../types";

// Helper to get API key from various environment variable formats (Vite, CRA, Standard)
const getApiKey = () => {
  // @ts-ignore - Support for Vite
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
    // @ts-ignore
    return import.meta.env.VITE_API_KEY;
  }
  // Support for Create React App (CRA)
  if (process.env.REACT_APP_API_KEY) {
    return process.env.REACT_APP_API_KEY;
  }
  // Standard Node/System env
  return process.env.API_KEY;
};

const apiKey = getApiKey();

if (!apiKey) {
  console.warn("API Key is missing. AI features will not work. Please check your .env file.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });

export const generateElevatorRender = async (config: ElevatorConfig): Promise<string> => {
  if (!apiKey) {
     throw new Error("API Key is missing. Please add VITE_API_KEY or REACT_APP_API_KEY to your .env file.");
  }

  const prompt = `
    Photorealistic architectural visualization of a modern passenger elevator interior. 
    Perspective: Inside the cabin looking towards the back wall.
    
    Configuration Details:
    - Walls: ${config.walls.material} (${config.walls.color} tone).
    - Back Wall Feature: ${config.walls.mirrorOnBack ? 'Large rectangular vanity mirror centered on the back wall' : 'Solid wall matching other walls'}.
    - Floor: ${config.floor.type} in ${config.floor.color}.
    - Ceiling: ${config.ceiling.type} design with bright, modern illumination.
    - Handrails: ${config.handrail}.
    - Control Panel: Sleek modern vertical control panel with digital display on the right side wall.
    
    Lighting: Professional studio lighting, reflections on metal surfaces, realistic shadows.
    Style: High-end, luxury, clean lines. 8k resolution, highly detailed textures.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
            aspectRatio: "3:4", 
            imageSize: "1K"
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data received from Gemini.");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};