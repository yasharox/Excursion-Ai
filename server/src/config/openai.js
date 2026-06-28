// import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";

const openai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default openai;
