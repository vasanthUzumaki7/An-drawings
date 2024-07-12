import React, { useRef } from 'react';
import '../components/second.css';


const Second = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth / 3, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth / 3, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      <button className="prevbutton" onClick={scrollLeft}>&laquo;</button>
      <div className="second-carousel" ref={carouselRef}>
        <img src="https://wallpaper.forfun.com/fetch/a8/a8f2b08ee7c1738df919bd5bde507d05.jpeg?h=600&r=0.5" alt="img1" />
        <img src="https://wallpaper.forfun.com/fetch/62/62e3ce60fc426fe6f475764cd99779b9.jpeg?h=600&r=0.5" alt="img2" />
        <img src="https://wallpaper.forfun.com/fetch/28/28d0953bb64b7ff8400c5c1aa6fe6464.jpeg?h=600&r=0.5" alt="img3" />
        <img src="https://wallpaper.forfun.com/fetch/c5/c5b1810ebc9bd6aafa31c757b5efc687.jpeg?h=600&r=0.5" alt="img4" />
        <img src="https://wallpaper.forfun.com/fetch/5d/5d193bfff6560f03e7bc2ecfeadef5f4.jpeg?h=600&r=0.5" alt="img5" />
        <img src="https://wallpaper.forfun.com/fetch/f6/f639851874060b429f9049beb1cc6149.jpeg?h=600&r=0.5" alt="img6" />
        <img src="https://wallpaper.forfun.com/fetch/30/30d23dfbddf3d41673a43cd825ff5d59.jpeg?h=600&r=0.5" alt="img7" />
        <img src="https://wallpaper.forfun.com/fetch/ec/ec9230d7cf51f2e8d0f7e17a6d44b69a.jpeg?h=600&r=0.5" alt="img8" />
      </div>
      <button className="nextbutton" onClick={scrollRight}>&raquo;</button>
    </div>
  );
};

export default Second;
