import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h2>
      <p className="text-lg text-gray-800">Thank you for your purchase.</p>
      {/* Các thông tin khác như đơn hàng, chi tiết đơn hàng, ... */}
    </div>
  );
};

export default SuccessPage;
