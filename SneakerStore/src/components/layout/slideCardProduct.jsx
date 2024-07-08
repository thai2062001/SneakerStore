import React from "react";

function SlideCardProduct() {
  const slides = [
    {
      name: "Nike Air Force 1",
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719915278/Buy_Wmns_Air_Force_1_07_White_-_315115_112___GOAT_jbcrfp.jpg",
    },
    {
      name: "Nike Air More Uptempo '96'",
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719993514/Nike_Air_More_Uptempo_96_Copy_Paste_-_White_DQ5014-100_-_Mens___Mens_US9___27CM___EU42_5_cvyjd1.jpg",
    },
    {
      name: "Nike JA 1",
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719915278/Nike_Nike_JA_1_-_Men_s_y3nupe.jpg",
    },
    {
      name: "Nike Lebron XXI VC",
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719915278/Nike_Nike_Zoom_LeBron_NXXT_Gen_Amped_-_Men_s_ia1cou.jpg",
    },
    {
      name: "New Balance 9060",
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719915278/New_Balance_9060_-_Women_s_Casual_Running_Shoes_-_Gray___White_bj1r28.jpg",
    },
    {
      name: "New Balance 9060",
      url: "https://res.cloudinary.com/dpdzbuiml/image/upload/v1719915277/Nike_Air_More_Uptempo_Scottie_Pippen_414962-105_-_MENS___Mens_US6___24CM___EU38_5_isxjfl.jpg",
    },
  ];
  return (
    <div className="w-full p-2">
      <div className="text-center ">
        <h1 className="font-bold text-[2.25rem]">New Shoe Arrivals</h1>
      </div>
      <div className="w-full  flex justify-center items-center flex-wrap space-x-0  sm:gap-4 md:gap-24 ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-1/2 md:w-auto flex-shrink-0 cursor-pointer"
          >
            <img
              src={slide.url}
              alt={`product ${index}`}
              className="h-26 w-[10rem] md:h-40 md:w-40 object-contain mx-auto"
            />
            <h1 className="font-sans font-medium text-center  md:text-md">
              {slide.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlideCardProduct;
