// src/components/ProductsPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { fetchStocks } from "../../../features/stock/stockSlice";
import { fetchProducts } from "../../../features/product/productSlice";
import ProductItems from "./ProductItems";
import SneakerFilter from "../filter/SneakerFilter";
import NotFoundPage from "../ErrorPage/NotFoundPage";
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
  const location = useLocation();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const stocks = useSelector((state) => state.stock.stocks);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const filters = {
      gender: query.get("gender"),
      brand: query.get("brand"),
      producttype: query.get("producttype"),
      shoestyle: query.get("shoestyle"),
      sort: query.get("sort"),
    };

    dispatch(fetchProducts(filters));
    dispatch(fetchStocks());
  }, [location.search, dispatch]);

  const handleFilterChange = (filters) => {
    const query = new URLSearchParams(filters).toString();
    navigate(`?${query}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <NotFoundPage />;
  }

  const colorsMap = getColorsFromStock(products, stocks);

  return (
    <>
      <Header />
      <Navbar />
      <div className="container mx-auto p-4 flex flex-row">
        <SneakerFilter onFilterChange={handleFilterChange} />
        <div className="flex flex-wrap mt-4 md:flex-row justify-center items-center gap-4 sm:flex-row">
          {products.map((product) => (
            <ProductItems
              key={product.product_id}
              id={product.product_id}
              image_url={product.image_url}
              gender={product.gender}
              name={product.name}
              price={product.price}
              colors={colorsMap[product.product_id]}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
