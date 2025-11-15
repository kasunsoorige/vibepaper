
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onImageClick: (image: GeneratedImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {images.map((image) => (
            <div
            key={image.id}
            className="aspect-[9/16] bg-gray-800 rounded-xl overflow-hidden cursor-pointer group relative transform transition-transform duration-300 hover:scale-105"
            onClick={() => onImageClick(image)}
            >
            <img
                src={`data:image/jpeg;base64,${image.base64}`}
                alt={image.prompt}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold px-2">View</p>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default ImageGallery;
