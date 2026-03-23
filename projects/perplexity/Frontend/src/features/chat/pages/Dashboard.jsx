import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import remarkGfm from "remark-gfm";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const loading = useSelector((state) => state.chat.loading);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
    setChatInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  return (
    <main className="h-screen w-full bg-[#07090f] text-white">
      <section className="mx-auto flex h-screen w-full gap-4 rounded-3xl border  p-1 md:gap-6 md:p-1 border-none">
        <aside
          className={`h-full flex flex-col overflow-y-hidden-auto  shrink-0 bg-[#1c212c] p-4 
  transition-[width] duration-300 ease-in-out
  ${isCollapsed ? "w-20" : "w-72"} 
  hidden md:flex`}
        >
          <div className="flex items-center ">
            {/* Title */}
            <div className="flex items-start gap-2 mb-5 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height={30}
                width={30}
                className="shrink-0"
              >
                <path d="M7.17267 3.26011L5.5 1.7395V4.00005V7.50005H4H3V8.50005V16.0001V17.0001H4H5.5V20.0001V22.2606L7.17267 20.74L11 17.2606V22.0001H13V17.2606L16.8273 20.74L18.5 22.2606V20.0001V17.0001H20H21V16.0001V8.50005V7.50005H20H18.5V4.00005V1.7395L16.8273 3.26011L13 6.7395V2.00005H11V6.7395L7.17267 3.26011Z" />
              </svg>

              {/* Animated Text */}
              <h1
                className={`text-3xl font-semibold tracking-tight whitespace-nowrap
        transition-all duration-200 ease-in-out
        ${isCollapsed ? "opacity-0 -translate-x-4 w-0" : "opacity-100 translate-x-0 w-auto"}`}
              >
                Perplexity
              </h1>
            </div>
          </div>

          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-start flex-col gap-3">
              <button
                className=" rounded-xl py-3 px-4 w-full font-bold flex items-center justify-center gap-2 bg-blue-500 transition duration-200 hover:bg-white/20 cursor-pointer"
                onClick={() => {
                  chat.handleOpenChat(null, chats);
                }}
              >
                <span>New</span>
                <FaPlus className="" />
              </button>

              {/* Chats */}
              <div className="space-y-2 overflow-auto">
                {Object.values(chats).map((chat, index) => (
                  <button
                    onClick={() => openChat(chat.id)}
                    key={index}
                    type="button"
                    className="flex items-center gap-2 w-full cursor-pointer rounded-xl border overflow-x-hidden border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 hover:border-white hover:text-white transition duration-150"
                  >
                    <IoMdChatbubbles className="text-xl shrink-0" />

                    {/* Animated text */}
                    <span
                      className={`whitespace-nowrap transition-all duration-200
            ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"}`}
                    >
                      {chat.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-white transition-transform duration-300 hover:scale-110"
              >
                {isCollapsed ? (
                  <GoSidebarCollapse className="text-2xl" />
                ) : (
                  <GoSidebarExpand className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </aside>

        <section className="relative pt-5 overflow-hidden max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4">
          <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
            {chats[currentChatId]?.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
                  message.role === "user"
                    ? "ml-auto rounded-br-none bg-white/12 text-white"
                    : "mr-auto"
                }`}
              >
                {message.role === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-2 list-disc pl-5">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-2 list-decimal pl-5">{children}</ol>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-white/10 px-1 py-0.5">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
                          {children}
                        </pre>
                      ),
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
            {loading && (
              <div className="mr-auto px-4 py-2 rounded-lg bg-white/10 w-fit">
                <span className="animate-pulse">AI is typing...</span>
              </div>
            )}
          </div>
          

          <footer className="rounded-3xl rounded-br-none rounded-bl-none w-full absolute bottom-0 overflow-hidden bg-[#212531] p-4 md:p-4">
            <form
              onSubmit={handleSubmitMessage}
              className="flex flex-col gap-3 md:flex-row"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
