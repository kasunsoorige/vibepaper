
import React, { useState, useCallback } from 'react';
import PromptForm from './components/PromptForm';
import ImageGallery from './components/ImageGallery';
import ImageModal from './components/ImageModal';
import Spinner from './components/Spinner';
import { SparklesIcon } from './components/icons';
import { generateWallpapers } from './services/geminiService';
import { GeneratedImage } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('a synthwave sunset over a retro-futuristic city');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const handleGenerate = useCallback(async (currentPrompt: string) => {
    if (!currentPrompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImages([]); // Clear previous images for a better loading experience

    try {
      const base64Images = await generateWallpapers(currentPrompt);
      const newImages = base64Images.map((base64) => ({
        id: crypto.randomUUID(),
        base64,
        prompt: currentPrompt,
      }));
      setImages(newImages);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerate(prompt);
  };

  const handleRemix = () => {
    if (selectedImage) {
      const remixPrompt = selectedImage.prompt;
      setPrompt(remixPrompt); // Update text area with the prompt being remixed
      setSelectedImage(null);
      handleGenerate(remixPrompt);
    }
  };

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = `data:image/jpeg;base64,${selectedImage.base64}`;
      link.download = `${selectedImage.prompt.slice(0, 30).replace(/\s/g, '_')}_${selectedImage.id.slice(0, 4)}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 p-8">
        <SparklesIcon className="w-24 h-24 mb-4 text-purple-500" />
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to VibePaper</h2>
        <p className="max-w-md">Describe any vibe, scene, or idea in the box below to generate four unique phone wallpapers instantly.</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <header className="text-center p-6 bg-gray-900 border-b border-gray-800">
        <h1 className="text-4xl font-bold tracking-tight">Vibe<span className="text-purple-500">Paper</span></h1>
        <p className="text-gray-400 mt-1">AI-Powered Wallpapers from Your Imagination</p>
      </header>

      <main className="flex-grow flex flex-col">
        {isLoading && <Spinner />}

        <div className="flex-grow overflow-y-auto pb-28"> 
           {error && <div className="text-center p-4 bg-red-900/50 text-red-300">{error}</div>}
           {images.length > 0 && <ImageGallery images={images} onImageClick={setSelectedImage} />}
           {!isLoading && images.length === 0 && !error && <WelcomeScreen />}
        </div>
      </main>

      <PromptForm
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onDownload={handleDownload}
        onRemix={handleRemix}
      />
    </div>
  );
};

export default App;
