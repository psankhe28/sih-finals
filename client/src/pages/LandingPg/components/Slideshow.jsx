import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slideshow = () => {
  const images = [
    'https://reach-out-sih-prototype.vercel.app/banner_1.jpg',
    'https://reach-out-sih-prototype.vercel.app/banner_2.jpg',
    // 'https://reach-out-sih-prototype.vercel.app/banner_3.jpg',
    'https://reach-out-sih-prototype.vercel.app/banner_4.jpg'
  ];

  const zoomInProperties = {
    indicators: false,
    scale: 1.2,
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: null,
    nextArrow: null,
  };

  return (
    <div className="w-100">
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div
            key={index}
            className="flex justify-center w-full h-full bg-transparent"
          >
            <img
              className="w-100 h-100 object-cover rounded-sm shadow-xl"
              src={each}
              alt="Home Images"
            />
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default Slideshow;