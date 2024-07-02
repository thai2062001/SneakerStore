import React from "react";

function Brands() {
  const slide = [
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719914193/33e63d5adb0da6b303a83901c8e8463a_kovgz8.jpg",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719914193/Jumpman_logo.svg_jaxqev.png",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719916033/new-balance-2-logo-png-transparent_r76eoo.png",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719914193/logo-adidas-vector-inkythuatso-01-29-09-08-58_mjedoe.jpg",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719914193/asics2623_ogz5p6.jpg",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719916032/cs_wjlsgb.jpg",
    },
    {
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719914192/logo-thuong-hieu-puma-elle-man-7_ujs1dd.jpg",
    },
  ];
  return (
    <div className="w-full p-2 flex justify-center items-center">
      <div className="w-full flex justify-center items-center space-x-4 gap-2 sm:gap-8 md:gap-24 ">
        {slide.map((slide, index) => (
          <div key={index} className="flex-shrink-0 cursor-pointer">
            <img
              src={slide.url}
              alt={`Brand ${index}`}
              className="h-12 w-12 md:h-40 md:w-40 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brands;
