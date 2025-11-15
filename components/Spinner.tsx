
import React from 'react';

const loadingMessages = [
  "Painting with pixels...",
  "Consulting the digital muse...",
  "Mixing vibrant vibes...",
  "Generating your masterpiece...",
  "Dreaming up new worlds...",
  "Crafting your custom wallpaper...",
];

const Spinner = () => {
  const [message, setMessage] = React.useState(loadingMessages[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-t-purple-500 border-gray-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-300 font-medium">{message}</p>
    </div>
  );
};

export default Spinner;
