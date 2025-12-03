import { GoogleGenAI } from "@google/genai";
import { ElevatorConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateElevatorRender = async (config: ElevatorConfig): Promise<string> => {
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
