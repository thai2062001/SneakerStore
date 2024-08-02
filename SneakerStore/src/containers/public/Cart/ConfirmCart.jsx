import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItemsByUserId,
  deleteCartItem,
} from "../../../features/Cart/cartItemSlice";
import Header from "../../../components/layout/Header";
import NotFoundPage from "../../../components/layout/ErrorPage/NotFoundPage";
import PayPalCheckout from "./PaypalPayment/PaypalCheckout";
import { path } from "../../../utils/constants";
import { decodeTokenId } from "../../../utils/decodeToken";
import { createOrder } from "../../../features/Order/orderSlice";
const ConfirmCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const status = useSelector((state) => state.cartItems.status);
  const error = useSelector((state) => state.cartItems.error);
  const orders = useSelector((state) => state.orders.orders);

  const [itemQuantities, setItemQuantities] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("direct"); // default to direct payment
  const [showPayPalButtons, setShowPayPalButtons] = useState(false); // State to control PayPal buttons
  const handlePaymentSuccess = () => {
    window.location.href = "/cart/cartdetail/payment/success";
  };

  useEffect(() => {
    dispatch(fetchCartItemsByUserId());
  }, [dispatch]);

  const handleQuantityChange = (e, index) => {
    const { value } = e.target;
    setItemQuantities({
      ...itemQuantities,
      [index]: parseInt(value),
    });
  };

  const handleRemoveItem = (itemId) => {
    dispatch(deleteCartItem(itemId));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckout = () => {
    // Logic to handle checkout based on paymentMethod
    if (paymentMethod === "paypal") {
      // Set state to show PayPal buttons
      setShowPayPalButtons(true);
    } else {
      // Handle direct payment checkout
      handleCreateOrder();
    }
  };

  const handleDirectPaymentCheckout = () => {
    window.location.href = "/cart/cartdetail/payment/success";
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <NotFoundPage />;
  }

  const calculateItemSubtotal = (item, quantity) => {
    const itemPrice = item.product.price;
    const itemSubtotal = itemPrice * quantity;
    return itemSubtotal;
  };

  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce((acc, item, index) => {
      const quantity = itemQuantities[index] || item.quantity;
      return acc + calculateItemSubtotal(item, quantity);
    }, 0);
    return subtotal;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1; // Fixed 10% tax rate
    return tax;
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.1; // Fixed 10% discount
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const totalDiscount = calculateDiscount();
    const total = subtotal + tax - totalDiscount;
    return total;
  };
  const handleCreateOrder = async () => {
    const user = decodeTokenId(); // Assuming this function returns user info
    const order = {
      user_id: user.user_id, // Replace with actual user id
      status: "Pending",
      totalAmount: calculateTotal().toFixed(2), // Replace with actual total amount calculation
      createdAt: new Date().toISOString(),
      orderItems: cartItems.map((item, index) => ({
        productId: item.product_id, // Replace with actual product id
        quantity: itemQuantities[index] || item.quantity,
        price: item.product.price,
        size: item.size,
        color: item.color,
      })),
    };
    console.log(order, "data");
    try {
      // Dispatch an action to create order
      const createdOrder = await dispatch(createOrder(order));
      console.log(createOrder);
      // setTimeout(() => {
      //   handlePaymentSuccess();
      // }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error scenario
    }
  };

  return (
    <section>
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <img
                    src={item.product.image_url}
                    alt={item.name}
                    className="size-28 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.product.name}
                    </h3>
                    <h3 className="text-lg font-sans text-gray-900">
                      {item.product.price} $
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[13px] text-gray-600">
                      <div>
                        <dt className="inline">Size: </dt>
                        <dd className="inline">{item.size}</dd>
                      </div>

                      <div>
                        <dt className="inline">Color: </dt>
                        <dd className="inline">{item.color}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label
                        htmlFor={`Line${index + 1}Qty`}
                        className="sr-only"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={itemQuantities[index] || item.quantity}
                        onChange={(e) => handleQuantityChange(e, index)}
                        id={`Line${index + 1}Qty`}
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
                      />
                    </form>

                    <button
                      className="text-gray-600 hover:text-red-600"
                      onClick={() => handleRemoveItem(item.cartItem_id)}
                    >
                      <span className="sr-only">Remove item</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 9H7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="mt-4 flex justify-between">
              <span className="text-lg font-bold text-gray-900">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">
                ${calculateSubtotal().toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Tax (10%)</span>
              <span className="text-sm text-gray-600">
                ${calculateTax().toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-green-600">Discount (10%)</span>
              <span className="text-sm text-green-600">
                -${calculateDiscount().toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between mt-4 border-t pt-4">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Method:
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    name="paymentMethod"
                    value="direct"
                    checked={paymentMethod === "direct"}
                    onChange={() => handlePaymentMethodChange("direct")}
                  />
                  <span className="ml-2 text-sm text-gray-600">Direct</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => handlePaymentMethodChange("paypal")}
                  />
                  <span className="ml-2 text-sm text-gray-600">PayPal</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Checkout
            </button>
          </div>

          {showPayPalButtons && (
            <div className="mt-8">
              <PayPalCheckout
                total={calculateTotal().toFixed(2)}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConfirmCart;
