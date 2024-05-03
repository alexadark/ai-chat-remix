import { useChat } from "ai/react";

const ChatUi = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat-api",
  });
  return (
    <div className="flex flex-col justify-center max-w-[960px] mx-auto min-h-screen">
      <h1 className="bg-gradient-to-r font-bold from-purple-500 to-pink-600 text-transparent bg-clip-text text-center">
        Remix streaming chat
      </h1>
      <section
        className="p-6 space-y-4 overflow-auto"
        style={{ maxHeight: "85vh" }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-lg py-0 px-4 m-2 rounded-lg shadow-md ${
                m.role === "user"
                  ? "bg-slate-300 text-black"
                  : "bg-slate-800 text-gray-300"
              }`}
            >
              <p className="whitespace-pre-wrap break-words my-3">
                {m.content}
              </p>
            </div>
          </div>
        ))}
      </section>
      <form onSubmit={handleSubmit} className="flex w-full p-6 ">
        <input
          type="text"
          className="flex-grow h-12 px-4 mr-4 text-xl bg-white text-black focus:outline-none rounded-sm"
          value={input}
          placeholder="Type your message here..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-6 h-12 text-slate-900 uppercase font-bold transition-colors duration-300 hover:bg-purple-600 focus:outline-none focus:ring-2 rounded-sm focus:ring-black focus:ring-offset-2 bg-gradient-to-l from-purple-500 to-pink-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUi;
