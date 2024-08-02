// src/containers/public/ProductDetail/ProductDetail.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../../features/product/productSlice";
import ProductDetailView from "./ProductDetailView";
import Header from "../../../components/layout/Header";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import NotFoundPage from "../../../components/layout/ErrorPage/NotFoundPage";
import ReviewProduct from "../Reviews/ReviewProduct";
const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.currentProduct);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <NotFoundPage />;
  }

  return (
    <>
      <Header />
      <Navbar />
      {product ? <ProductDetailView product={product} /> : null}
      <ReviewProduct productId={productId} />
      <Footer />
    </>
  );
};

export default ProductDetail;
