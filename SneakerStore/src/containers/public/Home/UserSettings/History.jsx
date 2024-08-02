import React, { useState, useEffect } from "react";
import { fetchOrder } from "../../../../features/Order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "/src/components/layout/Products/OrderCard"; // Đảm bảo đường dẫn đúng

const History = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to load orders. Please try again.</div>;
  }

  return (
    <div className="p-4">
      {orders.map((order) => (
        <OrderCard key={order.order_id} order={order} />
      ))}
    </div>
  );
};

export default History;
