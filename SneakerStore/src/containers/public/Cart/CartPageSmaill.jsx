import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItemsByUserId,
  deleteCartItem,
} from "../../../features/Cart/cartItemSlice";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../../../components/layout/ErrorPage/NotFoundPage";
const CartPageSmall = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const status = useSelector((state) => state.cartItems.status);
  const error = useSelector((state) => state.cartItems.error);
  console.log(cartItems);
  useEffect(() => {
    dispatch(fetchCartItemsByUserId());
  }, [dispatch]);

  const handleRemoveItem = (itemId) => {
    dispatch(deleteCartItem(itemId));
  };

  const handleViewCart = () => {
    navigate("/cart/cartdetail");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <NotFoundPage />;
  }

  return (
    <div className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <button
        className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
        onClick={onClose}
      >
        <span className="sr-only">Close cart</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.cartItem_id} className="flex items-center gap-4">
              {item.product && item.product.images ? (
                <img
                  src={item.product.images[0].image_url}
                  alt=""
                  className="h-16 w-16 rounded object-cover"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-200 rounded"></div>
              )}

              <div>
                <h3 className="text-sm text-gray-900">
                  {item.product ? item.product.name : "Unknown Product"}
                </h3>

                <dl className="mt-0.5 space-y-px text-xs text-gray-600">
                  <div className="flex">
                    <dt className="inline">Size:</dt>
                    <dd className="inline ml-1">{item.size}</dd>
                  </div>

                  <div className="flex">
                    <dt className="inline">Color:</dt>
                    <dd className="inline ml-1">{item.color}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2">
                <form>
                  <label htmlFor={`Qty${item.cartItem_id}`} className="sr-only">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue={item.quantity}
                    id={`Qty${item.cartItem_id}`}
                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                  />
                </form>

                <button
                  className="text-gray-600 transition hover:text-red-600"
                  onClick={() => handleRemoveItem(item.cartItem_id)}
                >
                  <span className="sr-only">Remove item</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-4 text-center flex flex-col justify-center">
          <button
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
            onClick={handleViewCart}
          >
            View my cart ({cartItems.length})
          </button>

          <a
            href="#"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </a>

          <a
            href="#"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartPageSmall;
