import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function SlideBanner() {
  const slides = [
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719909514/daniel-storek-JM-qKEd1GMI-unsplash_qrhcgc.jpg",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719912058/malvestida-DMl5gG0yWWY-unsplash_xcpj3w.jpg",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719912064/felipepelaquim-6zO5VKogoZE-unsplash_j1xwsn.jpg",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719912057/alexander-rotker-l8p1aWZqHvE-unsplash_kc2jop.jpg",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719912057/domino-studio-164_6wVEHfI-unsplash_ibnl2a.jpg",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const gotoSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="max-w-[1400px] h-[780px] m-auto py-16 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl  bg-center bg-cover duration-500 slide "
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] translate-x-0  translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => gotoSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlideBanner;
