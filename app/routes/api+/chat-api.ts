import { ActionFunctionArgs } from "@remix-run/node";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const config = { runtime: "edge" };

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function action({ request }: ActionFunctionArgs) {
  const { messages } = await request.json();
  const response = await openai.chat.completions.create({
    model: "llama3-8b-8192",
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  const aiResponse = new StreamingTextResponse(stream);

  return aiResponse;
}
