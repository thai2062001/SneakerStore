import React, { useState } from "react";
import { Tag } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function ProductItems({ id, image_url, name, price, colors, gender }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const navigate = useNavigate();

  const uniqueData = colors.filter(
    (value, index) => colors.indexOf(value) === index
  );

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="relative bg-white flex flex-row w-full sm:w-[260px] sm:flex-col md:flex-col md:w-[260px] rounded-lg cursor-pointer overflow-hidden hover:shadow-md hover:ring-2 hover:ring-black hover:ring-b-2">
      <img
        onClick={handleClick}
        className="w-[40%] sm:w-full sm:h-52 md:w-full md:h-52 object-cover"
        src={image_url}
        alt={name}
      />
      <div
        onClick={handleHeartClick}
        className="cursor-pointer absolute right-4 top-4 "
      >
        {isHeartFilled ? (
          <HeartFilled style={{ fontSize: "20px" }} />
        ) : (
          <HeartOutlined style={{ fontSize: "20px" }} />
        )}
      </div>
      <div
        onClick={handleClick}
        className="sm:p-2 md:p-2 p-6 w-[60%] md:w-full sm:w-full"
      >
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <div className="flex flex-row justify-between items-center">
          <Tag>{gender}</Tag>
          {uniqueData && (
            <div className="flex justify-center items-center">
              {uniqueData.map((color, index) => (
                <div key={index} className="flex justify-center items-center">
                  <h4>{color}</h4>
                  {index !== uniqueData.length - 1 && (
                    <span className="text-gray-500 mx-1">/</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-gray-700 font-medium text-[1.25rem] mt-4">
          ${price}
        </p>
      </div>
    </div>
  );
}

export default ProductItems;
