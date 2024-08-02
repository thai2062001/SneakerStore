import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { notification } from "antd";
import { decodeToken } from "../../../../utils/decodeToken";
const PayPalCheckout = ({ total, onSuccess }) => {
  const [showButtons, setShowButtons] = useState(true);
  console.log(total);
  // Lấy access token từ Local Storage
  const accessToken = localStorage.getItem("access-token");
  const username = decodeToken(accessToken);
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AeXwKzA5G5jKGiDOoWEPhRYDFimQ5xfzCg7I8KotP1vehVs0oHiGJo8mU8Act9Y12VDDknDmE0MGWtR9",
      }}
    >
      <div className="App">
        {showButtons && (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total, // Số tiền thanh toán
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                // alert(
                //   "Transaction completed by " + details.payer.name.given_name
                // );
                notification.success({
                  message: "Success",
                  description: "Transaction completed by " + username,
                });
                setTimeout(() => {
                  onSuccess();
                }, 2000);
              });
            }}
            // Thêm logic kiểm tra xem có access token hay không
            onError={(err) => {
              if (err.message.includes("Unauthorized")) {
                // Xử lý khi token hết hạn hoặc không hợp lệ
                console.log("khong co access token");
                // Thực hiện các hành động khác, ví dụ: đăng nhập lại
              }
            }}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
