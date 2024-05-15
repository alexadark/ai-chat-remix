import { ActionFunctionArgs } from "@remix-run/node";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

// export const config = { runtime: "edge" };

const prisma = new PrismaClient();

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const lastSession = await prisma.session.findFirst({
  orderBy: {
    createdAt: "desc",
  },
  include: {
    chatMessages: true,
  },
});
console.log("lastSession", lastSession);

export async function action({ request }: ActionFunctionArgs) {
  const { messages, id: sessionId, extraData } = await request.json();
  console.log("sessionId", extraData);

  let session;

  if (sessionId) {
    // Try to find an existing session by the provided sessionId
    session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
  }

  if (!session) {
    // Create a new session if one does not exist
    session = await prisma.session.create({
      data: {
        chatMessages: {
          create: messages.map((message) => ({
            question: message.content,
            answer: "",
          })),
        },
      },
    });
  } else {
    // Update existing session with new messages
    await prisma.chatMessage.createMany({
      data: messages.map((message) => ({
        sessionId: session.id,
        question: message.content,
        answer: "",
      })),
    });
  }

  const response = await openai.chat.completions.create({
    model: "llama3-8b-8192",
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response, {
    async onFinal(completion) {
      const chatMessage = await prisma.chatMessage.findFirst({
        where: {
          sessionId: session.id,
          question: messages[0].content,
        },
      });
      if (chatMessage) {
        await prisma.chatMessage.update({
          where: {
            id: chatMessage.id,
          },
          data: {
            answer: completion,
          },
        });
      }
    },
  });

  const aiResponse = new StreamingTextResponse(stream);

  return aiResponse;
}
