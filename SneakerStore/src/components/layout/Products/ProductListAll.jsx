// src/components/ProductsPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { fetchStocks } from "../../../features/stock/stockSlice";
import { fetchProducts } from "../../../features/product/productSlice";
import ProductItems from "./ProductItems";
import HeartIcon from "../heart";
const getColorsFromStock = (products, stocks) => {
  const colorsMap = {};

  products.forEach((product) => {
    const productId = product.product_id;
    colorsMap[productId] = [];

    stocks.forEach((stockItem) => {
      if (stockItem.product_id === productId) {
        colorsMap[productId].push(stockItem.color);
      }
    });
  });

  return colorsMap;
};

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const stocks = useSelector((state) => state.stock.stocks);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchStocks());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const colorsMap = getColorsFromStock(products, stocks);

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-wrap mt-4 md:flex-row justify-center items-center gap-4 sm:flex-row">
        {products.map((product) => (
          <ProductItems
            key={product.id}
            image_url={product.image_url}
            gender={product.gender}
            name={product.name}
            price={product.price}
            colors={colorsMap[product.product_id]} // Truyền mảng colors tương ứng với sản phẩm
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
