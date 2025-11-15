
import React from 'react';
import { WandIcon } from './icons';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-lg border-t border-gray-700">
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a rainy cyberpunk lo-fi street..."
            className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl resize-none p-4 pr-24 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            rows={1}
            disabled={isLoading}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(e);
                }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <WandIcon className="w-5 h-5" />
            <span>Generate</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
