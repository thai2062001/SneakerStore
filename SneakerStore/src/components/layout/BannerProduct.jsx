import React from "react";
const slides = [
  {
    tag: "Air Force",
    name: "Nike Dunk",
    url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719995842/Premium_PSD___Sport_shoes_sale_for_social_media_instagram_post_or_square_banner_template_design_xpxevh.jpg",
  },
  {
    tag: " Air Jordan 1",
    name: "Move With Style",
    url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719994280/Nike_Dunk_SB_fhaipu.jpg",
  },
  {
    tag: "Air Max 1 Blueprint",
    name: "Lifted Looks ",
    url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719995842/t%E1%BA%A3i_xu%E1%BB%91ng_5_papsji.jpg",
  },
];

function BannerProduct() {
  return (
    <div className="w-full p-2 mb-20">
      <div className=" flex md:flex-row flex-col justify-center items-center space-x-4 gap-10 md:gap-18 ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className=" flex-shrink-0 cursor-pointer w-[400px] h-[400px] md:w-[600px] md:h-[600px]  "
          >
            <img
              src={slide.url}
              alt={`product ${index}`}
              className="h-full w-full md:h-full md:w-full object-cover rounded-lg"
            />
            <h1 className=" md:text-[2rem] text-[1.35rem] font-bold font-sans  text-center  ">
              {slide.name}
            </h1>

            <h1 className=" md:text-[1rem] text-[1rem]  uppercase hover:underline  font-normal font-sans  text-center hidden md:block ">
              {slide.tag}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerProduct;
