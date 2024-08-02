import React from "react";

const OrderCard = ({ order }) => {
  // Chuyển đổi định dạng ngày giờ từ chuỗi ISO sang định dạng dễ đọc hơn
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-full bg-white shadow-md rounded-lg overflow-hidden my-4 flex">
      <div className="p-4 w-full">
        <h2 className="text-lg font-bold mb-2">Order #{order.order_id}</h2>
        <p className="text-gray-600 mb-2">Status: {order.status}</p>
        <p className="text-gray-600 mb-2">Total Amount: ${order.totalAmount}</p>
        <p className="text-gray-600 mb-4">Created At: {formattedDate}</p>
        <div className="flex flex-col space-y-4">
          {order.orderItems.map((item) => (
            <div
              key={item.orderItem_id}
              className="flex space-x-4 items-center"
            >
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-cover"
              />
              <div>
                <h3 className="text-md font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-gray-600">Color: {item.color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
