import React, { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown, Mic, ArrowUp, Paperclip } from "lucide-react";

export function AttachmentButton({ onAttach }) {
  return (
    <button
      type="button"
      onClick={onAttach}
      aria-label="Add attachment"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <Plus className="h-5 w-5" />
    </button>
  );
}

export function PromptTextarea({ value, onChange, onSubmit }) {
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
      placeholder="How can I help you today?"
      rows={1}
      aria-label="AI Prompt Input"
      className="w-full resize-none bg-transparent px-2 py-1 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 border-none max-h-[140px] leading-relaxed font-sans"
    />
  );
}

export function ModeSelector({ mode, onSelectMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Auto", "GPT-4o", "Claude 3.5", "Perplexity"];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select AI Mode"
        aria-expanded={isOpen}
        className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span>{mode}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-36 rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-50">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onSelectMode(opt);
                setIsOpen(false);
              }}
              className={`w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                mode === opt
                  ? "bg-blue-50 text-blue-600 font-semibold"
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

export function VoiceButton({ onVoiceClick }) {
  return (
    <button
      type="button"
      onClick={onVoiceClick}
      aria-label="Voice input"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <Mic className="h-4 w-4" />
    </button>
  );
}

export function SendButton({ isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isActive}
      aria-label="Send prompt"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isActive
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95 cursor-pointer"
          : "bg-slate-200 text-slate-400 cursor-not-allowed"
      }`}
    >
      <ArrowUp className="h-4 w-4 stroke-[2.5]" />
    </button>
  );
}

export function PromptBar({ onSend, className = "" }) {
  const [promptText, setPromptText] = useState("");
  const [selectedMode, setSelectedMode] = useState("Auto");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (promptText.trim()) {
      if (onSend) onSend(promptText, selectedMode);
      setPromptText("");
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
      className={`relative flex w-full max-w-[800px] items-center gap-2 rounded-full border bg-white px-3 py-2 transition-all duration-200 shadow-sm hover:shadow-md ${
        isFocused
          ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md"
          : "border-slate-200 hover:border-slate-300"
      } ${className}`}
    >
      <AttachmentButton onAttach={() => alert("Attachment clicked")} />
      
      <div className="flex-1 min-w-0">
        <PromptTextarea
          value={promptText}
          onChange={setPromptText}
          onSubmit={handleSend}
        />
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <ModeSelector mode={selectedMode} onSelectMode={setSelectedMode} />
        <VoiceButton onVoiceClick={() => alert("Voice clicked")} />
        <SendButton isActive={promptText.trim().length > 0} onClick={handleSend} />
      </div>
    </div>
  );
}

export default PromptBar;
