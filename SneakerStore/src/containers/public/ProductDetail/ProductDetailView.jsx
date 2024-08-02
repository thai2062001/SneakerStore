import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { createCartItem } from "../../../features/Cart/cartItemSlice";
import { decodeTokenId } from "../../../utils/decodeToken";
const predefinedColors = ["Red", "Blue", "Black", "White"];
const predefinedSizes = ["S", "M", "L", "XL"];

const ProductDetailView = ({ product }) => {
  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState(product.images[0].image_url);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);
  const [selectedSize, setSelectedSize] = useState(predefinedSizes[0]);

  const handleThumbnailClick = (imageUrl, index) => {
    setMainImage(imageUrl);
    setSelectedThumbnail(index);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    const info_user = localStorage.getItem("access-token");
    const user = decodeTokenId(info_user);
    const createCartItemDto = {
      cart_id: user.cart_id, // Sử dụng cart_id từ state hoặc props nếu cần
      product_id: product.product_id,
      quantity: 1, // Bạn có thể thêm logic để thay đổi số lượng nếu cần
      color: selectedColor,
      size: selectedSize,
    };

    // Dispatch action to add item to cart
    dispatch(createCartItem(createCartItemDto));

    // Show success notification
    notification.success({
      message: "Success",
      description: "Your product has been added to the cart.",
    });

    // Show error notification
    // notification.error({
    //   message: "Error",
    //   description: "Failed to add the product to the cart.",
    // });

    // Reset form or perform other actions as needed
  };

  return (
    <div className="container mx-auto bg-[#f5f5f5] flex flex-col md:flex-row mt-20">
      {/* Product Image and Thumbnails */}
      <div className="w-full md:w-2/3 flex flex-col items-center relative">
        <div className="w-full bg-[#ffffff]">
          <h1 className="md:hidden text-[40px] font-bold">{product.name}</h1>
          <span className="md:hidden text-yellow-500">★★★★☆ </span>
          <span className="md:hidden">({product.reviews.length} reviews)</span>
        </div>

        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-[400px]  md:h-[720px] bg-center object-contain"
        />
        <div className="flex items-center justify-center space-x-2  w-full">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.image_url}
              alt={product.name}
              className={`w-20 h-20 object-cover cursor-pointer border ${
                selectedThumbnail === index
                  ? "border-gray-900"
                  : "border-transparent"
              }`}
              onClick={() => handleThumbnailClick(img.image_url, index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className=" md:w-1/3 md:h-[780px] mt-2 md:mr-2 p-5 bg-[#ffffff]">
        <h1 className="hidden md:block text-[40px] font-bold">
          {product.name}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-semibold text-gray-700">
            {product.price} $
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">★★★★☆</span>
          <span>({product.reviews.length} reviews)</span>
        </div>
        <div className="mt-2">
          <p>{product.description}</p>
        </div>

        {/* Colors */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Colors:</h2>
          <div className="flex space-x-2">
            {predefinedColors.map((color, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-full cursor-pointer ${
                  color === "Red"
                    ? "bg-red-500"
                    : color === "Blue"
                    ? "bg-blue-500"
                    : color === "Black"
                    ? "bg-black"
                    : "bg-white border"
                } ${selectedColor === color ? "border-4 border-black" : ""}`}
                title={color}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Size:</h2>
          <div className="flex space-x-2 flex-wrap">
            {predefinedSizes.map((size, index) => (
              <button
                key={index}
                className={`border rounded-full font-semibold px-3 py-1 focus:outline-none ${
                  selectedSize === size ? "bg-black text-white" : ""
                }`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Shipping Options */}
        <div className="mt-4">
          <div className="border p-4 rounded-md">
            <h2 className="text-lg font-semibold">Shipping:</h2>
            <div>
              <input
                type="radio"
                id="shipToMe"
                name="shipping"
                value="shipToMe"
                className="mr-2"
              />
              <label htmlFor="shipToMe">
                {" "}
                Ship to me (Arrives in 3-5 business days)
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="pickUpInStore"
                name="shipping"
                value="pickUpInStore"
                className="mr-2"
              />
              <label htmlFor="pickUpInStore">
                {" "}
                Pick up in store (Select your local store)
              </label>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          <button
            className="bg-black w-full text-white px-6 py-2 rounded-md hover:bg-gray-800"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
