// CarouselSlider.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useThemeTrigger } from '../../ThemeTrigger'; // Adjust path as needed
import styles from './CarouselSlider.module.css';

const CarouselSlider = () => {
  const { darkMode } = useThemeTrigger();
  const banners = [
    { id: 1, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', text: "Free delivery on orders above ₹200" },
    { id: 2, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', text: "20% off on first order" },
    { id: 3, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80', text: "Fresh meals prepared daily" }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  const autoPlayInterval = useRef(null);

  // Minimum swipe distance required
  const minSwipeDistance = 50;

  // Function to handle next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  }, [banners.length]);

  // Function to handle previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Function to reset autoplay timer
  const resetAutoPlay = useCallback(() => {
    setIsAutoPlaying(true);
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
    autoPlayInterval.current = setInterval(() => {
      if (isAutoPlaying) {
        nextSlide();
      }
    }, 5000);
  }, [isAutoPlaying, nextSlide]);

  // Initialize autoplay and clean up on unmount
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(nextSlide, 5000);
    }
    
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  // Touch event handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    // Reset autoplay after manual interaction
    resetAutoPlay();
  };

  // Handle manual navigation
  const handleManualNavigation = (index) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  // Pause autoplay on hover (desktop)
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    resetAutoPlay();
  };

  return (
    <div 
      className={`${styles.carouselContainer} ${darkMode ? styles.darkMode : ''}`}
      ref={carouselRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.carouselBanner}>
        <div 
          className={styles.carouselInner}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              className={styles.carouselItem}
            >
              <img src={banner.image} alt={`Promotion ${banner.id}`} />
              <div className={styles.carouselCaption}>
                <h3>{banner.text}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <button 
          className={`${styles.carouselControl} ${styles.prev}`}
          onClick={() => {
            prevSlide();
            resetAutoPlay();
          }}
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button 
          className={`${styles.carouselControl} ${styles.next}`}
          onClick={() => {
            nextSlide();
            resetAutoPlay();
          }}
          aria-label="Next slide"
        >
          &gt;
        </button>
        
        <div className={styles.carouselIndicators}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={index === currentSlide ? styles.active : ''}
              onClick={() => handleManualNavigation(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSlider;