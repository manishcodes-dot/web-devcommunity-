import React, { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown, Mic, ArrowUp, Paperclip } from "lucide-react";

export function AttachmentButton({ onAttach, isDarkMode = false }) {
  return (
    <button
      type="button"
      onClick={onAttach}
      aria-label="Add attachment"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer ${
        isDarkMode
          ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      <Plus className="h-5 w-5" />
    </button>
  );
}

export function PromptTextarea({ value, onChange, onSubmit, isDarkMode = false, placeholder = "Search tech notes, ask a dev question, or explore topics..." }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 140);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      rows={1}
      aria-label="Community Search or Question Input"
      className={`w-full resize-none bg-transparent px-2 py-1 text-sm sm:text-base focus:outline-none focus:ring-0 border-none max-h-[140px] leading-relaxed font-sans ${
        isDarkMode
          ? "text-zinc-100 placeholder:text-zinc-500"
          : "text-slate-900 placeholder:text-slate-400"
      }`}
    />
  );
}

export function ModeSelector({ mode, onSelectMode, isDarkMode = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Explore All", "Architecture", "Debugging", "Frontend", "Backend", "AI & Tools"];
  const selectorRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={selectorRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select AI Mode"
        aria-expanded={isOpen}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer ${
          isDarkMode
            ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        <span>{mode}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>

      {isOpen && (
        <div
          className={`absolute bottom-full right-0 mb-2 w-36 rounded-xl border p-1 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100 ${
            isDarkMode
              ? "bg-[#18181b] border-zinc-800 text-zinc-200"
              : "bg-white border-slate-200 text-slate-800"
          }`}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onSelectMode(opt);
                setIsOpen(false);
              }}
              className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-colors cursor-pointer ${
                mode === opt
                  ? isDarkMode
                    ? "bg-emerald-500/20 text-emerald-400 font-semibold"
                    : "bg-emerald-50 text-emerald-600 font-semibold"
                  : isDarkMode
                  ? "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function VoiceButton({ onVoiceClick, isDarkMode = false }) {
  return (
    <button
      type="button"
      onClick={onVoiceClick}
      aria-label="Voice input"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer ${
        isDarkMode
          ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      <Mic className="h-4 w-4" />
    </button>
  );
}

export function SendButton({ isActive, onClick, isDarkMode = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isActive}
      aria-label="Send prompt"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        isActive
          ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md active:scale-95 cursor-pointer"
          : isDarkMode
          ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          : "bg-slate-200 text-slate-400 cursor-not-allowed"
      }`}
    >
      <ArrowUp className="h-4 w-4 stroke-[2.5]" />
    </button>
  );
}

export function PromptBar({ onSend, onAttach, className = "", isDarkMode = false, placeholder }) {
  const [promptText, setPromptText] = useState("");
  const [selectedMode, setSelectedMode] = useState("Explore All");
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (promptText.trim()) {
      if (onSend) onSend(promptText, selectedMode);
      setPromptText("");
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please type your query directly.");
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPromptText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
      className={`relative flex w-full max-w-[800px] items-center gap-2 rounded-full border pl-5 pr-2 py-1.5 sm:py-2 transition-all duration-200 shadow-sm hover:shadow-md ${
        isDarkMode
          ? `bg-[#18181b] ${
              isFocused
                ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                : "border-zinc-800 hover:border-zinc-700"
            }`
          : `bg-white ${
              isFocused
                ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
                : "border-slate-200 hover:border-slate-300"
            }`
      } ${className}`}
    >
      <div className="flex-1 min-w-0">
        <PromptTextarea
          value={promptText}
          onChange={setPromptText}
          onSubmit={handleSend}
          isDarkMode={isDarkMode}
          placeholder={placeholder}
        />
      </div>

      <SendButton isActive={promptText.trim().length > 0} onClick={handleSend} isDarkMode={isDarkMode} />
    </div>
  );
}

export default PromptBar;
