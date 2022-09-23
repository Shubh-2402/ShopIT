import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import { getProducts } from "../actions/productActions";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={"Buy Best Products"}></MetaData>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
