import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"; // ✅ Import dotenv here directl

async function main(preference) {
  // ✅ Explicitly execute it right here inside the function block
  dotenv.config();

  if (!preference) {
    throw new Error("Prompt is required");
  }

  // Safe-check to make sure index.js successfully loaded the key
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY is not defined in your .env file!");
    return;
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const tools = [
    {
      googleSearch: {},
    },
  ];

  // ✅ FIXED: Removed 'thinkingConfig' to prevent immediate 429 quota exhaustion blocks
  const config = {
    tools,
    systemInstruction:
      "You are a helpful chat assistant named Yash's Assistant. You provide clear, direct technical details and keep your tone polite and professional suggestion for carnival excursions.",
    // Custom Run Settings:
    temperature: 1.0, // Controls randomness (matches the slider set to 1 in your image)
    maxOutputTokens: 500, // Optional: restricts response length limits
  };

  // ✅ FIXED: Switched to standard flash for higher free-tier limits
  const model = "gemini-2.5-flash";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: preference,
        },
      ],
    },
  ];

  try {
    console.log("🤖 Asking Gemini...");
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    // Stream the output cleanly onto a single line in your terminal
    let completeText = "";
    for await (const chunk of response) {
      if (chunk.text) {
        process.stdout.write(chunk.text);
        completeText += chunk.text;
      }
    }
    return completeText; // ✅ FIXED: Return the result to the router
    console.log("\n"); // Clear line when finished
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
  }
}

// Fire the function automatically on import
// main();

export default main;
