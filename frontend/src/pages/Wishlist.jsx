import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Wishlist = () => {
  // State to manage selected images
  const [selectedImages, setSelectedImages] = useState(
    Array(25).fill(false)
  );

  const toggleSelection = (index) => {
    const newSelected = [...selectedImages];
    newSelected[index] = !newSelected[index];
    setSelectedImages(newSelected);
  };

  // Example data - replace with your actual data
  const images = Array(25).fill({
    src: '/public/image.jpg'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex flex-col">
      <Header 
        showTimer={true}
        userName="DESHANT MEMARA"
        notificationCount={2}
      />
      
      <div className="max-w-[1400px] mx-auto p-8 flex-grow">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-7xl font-light tracking-wider">WISHLIST</h1>
          <button className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-6 py-2 rounded-full transition-colors text-sm">
            REPLACE
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square group cursor-pointer"
              onClick={() => toggleSelection(index)}
            >
              {/* Pink gradient border effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-[2px] transition-opacity duration-200 ${selectedImages[index] ? 'opacity-100' : 'opacity-40'}`}>
                <div className="absolute inset-[1px] bg-white rounded-[10px]" />
              </div>
              
              {/* Image Container */}
              <div className="relative h-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-black/5"></div>
                <img
                  src={image.src}
                  alt={`Wishlist item ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-200 hover:scale-105"
                  style={{ aspectRatio: '1/1' }}
                />
                
                {/* Checkbox */}
                <div className="absolute bottom-2 right-2 z-10">
                  <div className={`w-6 h-6 rounded ${selectedImages[index] ? 'bg-blue-500' : 'bg-white border-2 border-gray-300'} flex items-center justify-center transition-colors duration-200`}>
                    {selectedImages[index] && (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <button className="bg-green-500 text-white rounded-full p-3 md:p-4 shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110">
          <svg className="w-6 md:w-8 h-6 md:h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist; 