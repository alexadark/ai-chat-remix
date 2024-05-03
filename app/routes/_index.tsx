import { MetaFunction } from "@remix-run/node";
import ChatUI from "../components/ChatUi";

// IMPORTANT! Set the runtime to edge when deployed to vercel
export const config = { runtime: "edge" };

export const meta: MetaFunction = () => {
  return [{ title: "Your Remix AI APP" }];
};

export default function Home() {
  return <ChatUI />;
}
