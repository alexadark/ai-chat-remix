import { ActionFunctionArgs } from "@remix-run/node";
import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText } from "ai";

export const config = { runtime: "edge" };

export async function action({ request }: ActionFunctionArgs) {
  const { messages } = await request.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
  });

  // Respond with the stream
  return new StreamingTextResponse(result.toAIStream());
}
