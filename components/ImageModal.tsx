
import React from 'react';
import { GeneratedImage } from '../types';
import { DownloadIcon, RemixIcon, CloseIcon } from './icons';

interface ImageModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
  onDownload: () => void;
  onRemix: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose, onDownload, onRemix }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-gray-800/50 rounded-full p-2 hover:bg-gray-700/70 transition-colors"
        aria-label="Close"
      >
        <CloseIcon className="w-6 h-6" />
      </button>

      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="max-w-sm w-full aspect-[9/16] rounded-lg overflow-hidden shadow-2xl shadow-purple-900/50">
           <img
            src={`data:image/jpeg;base64,${image.base64}`}
            alt={image.prompt}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 bg-green-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <DownloadIcon className="w-5 h-5" />
            <span>Download</span>
          </button>
          <button
            onClick={onRemix}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <RemixIcon className="w-5 h-5" />
            <span>Remix</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
