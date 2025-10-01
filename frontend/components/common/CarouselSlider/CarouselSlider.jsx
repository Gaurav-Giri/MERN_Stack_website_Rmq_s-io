import React, { useState, useEffect } from 'react';
import banner1 from '../../../../public/assets/images/banner1.jpg';
import banner2 from '../../../../public/assets/images/banner2.jpg';
import banner3 from '../../../../public/assets/images/banner3.jpg';

const CarouselBanner = () => {
  const banners = [
    { id: 1, image: banner1, text: "Free delivery on orders above ₹200" },
    { id: 2, image: banner2, text: "20% off on first order" },
    { id: 3, image: banner3, text: "Fresh meals prepared daily" }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="carousel-banner">
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div 
            key={banner.id}
            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={banner.image} alt={`Promotion ${banner.id}`} />
            <div className="carousel-caption">
              <h3>{banner.text}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            className={index === currentSlide ? 'active' : ''}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselBanner;