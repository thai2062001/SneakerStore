import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItemsByUserId,
  deleteCartItem,
} from "../../../features/Cart/cartItemSlice";
import Header from "../../../components/layout/Header";
import NotFoundPage from "../../../components/layout/ErrorPage/NotFoundPage";
import ProgressSteps from "../../../components/layout/ProgressSteps";
const CartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const status = useSelector((state) => state.cartItems.status);
  const error = useSelector((state) => state.cartItems.error);

  const [discountCode, setDiscountCode] = useState("");
  const [itemQuantities, setItemQuantities] = useState({});

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
  const handleCheckOut = () => {
    // Xử lý sau khi thanh toán thành công, ví dụ chuyển hướng đến trang thành công
    // Thực hiện chuyển hướng
    window.location.href = "/cart/cartdetail/payment";
  };

  const handleRemoveItem = (itemId) => {
    dispatch(deleteCartItem(itemId));
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
    const tax = subtotal * 0.1; // assuming 10% tax rate
    return tax;
  };

  const calculateDiscount = () => {
    if (discountCode.toLowerCase() === "new member") {
      return calculateSubtotal() * 0.1; // 10% discount
    } else {
      return 0; // No discount
    }
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const totalDiscount = calculateDiscount();
    const total = subtotal + tax - totalDiscount;
    return total;
  };

  const handleApplyDiscount = () => {
    // Logic to apply discount
    // For example, update discount state
    setDiscountCode("new member"); // Example of applying discount code
  };

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  return (
    <section>
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <ProgressSteps currentStep="Cart" />
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
            <div className="flex justify-end gap-4">
              <div>
                <label htmlFor="discountCode" className="sr-only">
                  Discount Code
                </label>
                <input
                  type="text"
                  id="discountCode"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={handleDiscountCodeChange}
                  className="h-8 w-40 rounded border-gray-200 bg-gray-50 p-2 text-xs text-gray-600 focus:outline-none"
                />
              </div>
              <button
                onClick={handleApplyDiscount}
                className="text-sm text-gray-600 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition duration-300"
              >
                Apply Discount
              </button>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-lg font-bold text-gray-900">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">
                ${calculateSubtotal()}
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Tax (10%)</span>
              <span className="text-sm text-gray-600">
                ${calculateTax().toFixed(2)}
              </span>
            </div>

            {calculateDiscount() > 0 && (
              <div className="flex justify-between mt-2">
                <span className="text-sm text-green-600">Discount</span>
                <span className="text-sm text-green-600">
                  -${calculateDiscount().toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between mt-4 border-t pt-4">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
          <div
            onClick={handleCheckOut}
            className="flex justify-end items-center"
          >
            <a
              href="#"
              className="block w-[150px] rounded text-center bg-gray-700 px-5 py-3 text-md mt-4 text-gray-100 transition hover:bg-gray-600"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
