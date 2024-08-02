// src/components/ReviewProduct.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviewsByProductId } from "../../../features/review/reviewSlice";
import { Spin, Card, Rate, Avatar, Divider, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

function ReviewProduct({ productId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const status = useSelector((state) => state.reviews.status);
  const error = useSelector((state) => state.reviews.error);

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsByProductId(productId));
    }
  }, [dispatch, productId]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative p-4 ">
      {reviews.length === 0 ? (
        <p>No reviews available for this product.</p>
      ) : (
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <Card key={review.id} className="flex-shrink-0 w-full">
                <div className="flex items-center">
                  <Avatar
                    size={45}
                    icon={<UserOutlined />}
                    src={review.user.avatar || undefined}
                    className="mr-3"
                  />
                  <div>
                    <h4 className="font-semibold">{review.user.username}</h4>
                    <p className="text-gray-600 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Rate disabled value={review.rating} className="mt-2 mb-2" />
                <p>{review.comment}</p>
                <Divider />
                <div className="flex items-center">
                  <img
                    src={review.product.image_url}
                    alt={review.product.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold">{review.product.name}</h5>
                    <p className="text-gray-500">
                      {review.product.description}
                    </p>
                    <p className="font-bold">${review.product.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 w-[35px] left-4 transform -translate-y-1/2  bg-black/20 text-white p-2 rounded-full"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 w-[35px] right-4 transform -translate-y-1/2  bg-black/20 text-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewProduct;
