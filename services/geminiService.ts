import { GoogleGenAI } from "@google/genai";
import { ElevatorConfig } from "../types";

// Helper to get API key safely ensuring no "process is not defined" crashes
const getApiKey = () => {
  // 1. Try Vite format (import.meta.env)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
    // @ts-ignore
    return import.meta.env.VITE_API_KEY;
  }
  
  // 2. Try Standard Node/CRA format (process.env) - Safe check
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.REACT_APP_API_KEY) {
      return process.env.REACT_APP_API_KEY;
    }
    if (process.env.API_KEY) {
      return process.env.API_KEY;
    }
  }
  
  return "";
};

const apiKey = getApiKey();

if (!apiKey) {
  console.warn("API Key is missing. AI features will not work. Please check your .env file.");
}

// Initialize with valid key or empty string (to allow app to load, will fail only on generation)
const ai = new GoogleGenAI({ apiKey: apiKey || 'missing-key' });

export const generateElevatorRender = async (config: ElevatorConfig): Promise<string> => {
  const currentKey = getApiKey();
  
  if (!currentKey) {
     throw new Error("API Key is missing. Please add VITE_API_KEY or REACT_APP_API_KEY to your .env file.");
  }
  
  // Re-initialize to ensure we have the latest key if it was set late
  const activeAi = new GoogleGenAI({ apiKey: currentKey });

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
    const response = await activeAi.models.generateContent({
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