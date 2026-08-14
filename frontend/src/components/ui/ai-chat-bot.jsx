import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  MessageSquare,
  X,
  Minimize2,
  Maximize2,
  Trash2,
  Bot,
  User,
  Zap,
  PenTool,
  Lightbulb,
} from "lucide-react";
import { PromptBar } from "@/components/ui/prompt-bar";

export function AiChatBot({ isDarkMode = false, onCreateNoteClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai",
      text: "Hello! 👋 I'm your AI Assistant. How can I help you with your articles, notes, or ideas today?",
      time: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendPrompt = (promptText, mode) => {
    if (!promptText.trim()) return;

    // Expand chat drawer if it was collapsed
    if (!isOpen) setIsOpen(true);

    const userMsg = {
      id: String(Date.now()),
      sender: "user",
      text: promptText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response after a brief delay
    setTimeout(() => {
      let aiResponseText = `Thanks for asking! Using mode **${mode}**, I analyzed your query: "${promptText}".`;

      const lower = promptText.toLowerCase();
      if (lower.includes("summarize") || lower.includes("feed") || lower.includes("article")) {
        aiResponseText = "Here is a quick summary of your feed:\n\n• **Architecture in 2026**: Monolithic simplicity and edge rendering lead modern web apps.\n• **Minimalist UI**: Intentional focus and reduced visual noise drive 3x higher engagement.\n• **Tech Markets**: Vertical software SaaS experiences a resilient revival.";
      } else if (lower.includes("note") || lower.includes("write") || lower.includes("draft")) {
        aiResponseText = "I can help you draft a new note! Click the '**+ Create New Note**' button at the top or let me generate a draft title and excerpt for you right here.";
      } else if (lower.includes("hello") || lower.includes("hi")) {
        aiResponseText = "Hello! How can I assist your reading or note-taking journey today?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "ai",
          text: aiResponseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const handleQuickChip = (text) => {
    handleSendPrompt(text, "Auto");
  };

  const handleClearMessages = () => {
    setMessages([
      {
        id: "1",
        sender: "ai",
        text: "Chat cleared! How can I help you now?",
        time: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Non-intrusive Pop Up Tooltip (Displays 'Ask AI Chat') */}
      {!isOpen && showTooltip && (
        <div
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-22 right-6 md:right-8 z-40 cursor-pointer px-3.5 py-2 rounded-2xl border text-xs font-semibold shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 hover:scale-105 active:scale-95 group ${
            isDarkMode
              ? "bg-[#18181b]/95 backdrop-blur-md border-zinc-800 text-zinc-100 shadow-black/40"
              : "bg-white/95 backdrop-blur-md border-slate-200 text-slate-800 shadow-slate-300/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">Ask AI Chat</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className={`ml-1 p-0.5 rounded-full transition-colors ${
                isDarkMode ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-slate-100 text-slate-400"
              }`}
              title="Dismiss tooltip"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          {/* Speech Bubble Arrow pointing down right */}
          <div
            className={`absolute -bottom-1.5 right-5 w-3 h-3 rotate-45 border-r border-b ${
              isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-slate-200"
            }`}
          />
        </div>
      )}

      {/* Circular Floating Trigger Button (No text inside button) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 md:right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
          title="Open AI Chatbot"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="h-6 w-6 transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full bg-white animate-ping" />
          </div>
        </button>
      )}

      {/* Pop Up AI Chatbot Interface */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-4 sm:right-6 md:right-8 z-50 w-[92vw] max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95 ${
            isDarkMode
              ? "bg-[#141417]/95 backdrop-blur-xl border-zinc-800 text-zinc-100 shadow-black/60"
              : "bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900 shadow-slate-400/30"
          }`}
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {/* Pop Up Header */}
          <div
            className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
              isDarkMode ? "border-zinc-800/80 bg-zinc-900/80" : "border-slate-100 bg-slate-50/90"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-sm">
                <Bot className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold flex items-center gap-1.5">
                  <span>AI Assistant</span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <p className={`text-[10px] ${isDarkMode ? "text-zinc-400" : "text-slate-500"}`}>
                  Always ready to help with notes & articles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearMessages}
                title="Clear chat"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isDarkMode
                    ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat interface"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isDarkMode
                    ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[220px] max-h-[320px] sm:max-h-[360px] scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold mt-0.5 shadow-xs">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-500 text-white rounded-br-none shadow-xs font-medium"
                      : isDarkMode
                      ? "bg-zinc-800/90 text-zinc-200 border border-zinc-700/50 rounded-bl-none"
                      : "bg-slate-100 text-slate-800 border border-slate-200/60 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right opacity-70 ${
                      msg.sender === "user" ? "text-white" : isDarkMode ? "text-zinc-400" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                  AI
                </div>
                <div
                  className={`rounded-2xl px-4 py-2 text-xs flex items-center gap-1 ${
                    isDarkMode ? "bg-zinc-800 text-zinc-400" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div
            className={`px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-t shrink-0 ${
              isDarkMode ? "border-zinc-800/60 bg-zinc-900/40" : "border-slate-100 bg-slate-50/50"
            }`}
          >
            <button
              type="button"
              onClick={() => handleQuickChip("Summarize current feed")}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 flex items-center gap-1 transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  : "bg-slate-200/70 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Zap className="h-3 w-3 text-emerald-500" />
              <span>Summarize feed</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickChip("Help me draft a new note")}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 flex items-center gap-1 transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  : "bg-slate-200/70 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <PenTool className="h-3 w-3 text-blue-500" />
              <span>Draft note</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickChip("Brainstorm web development topics")}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 flex items-center gap-1 transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  : "bg-slate-200/70 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Lightbulb className="h-3 w-3 text-amber-500" />
              <span>Brainstorm</span>
            </button>
          </div>

          {/* Prompt Bar inside Pop Up Chat Window */}
          <div
            className={`p-2.5 border-t shrink-0 ${
              isDarkMode ? "border-zinc-800 bg-[#18181b]" : "border-slate-100 bg-slate-50"
            }`}
          >
            <PromptBar
              onSend={handleSendPrompt}
              isDarkMode={isDarkMode}
              placeholder="Ask AI Chatbot anything..."
              className="shadow-none border border-slate-200 dark:border-zinc-700/80"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AiChatBot;
