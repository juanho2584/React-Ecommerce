import React from "react";
import Product from "./Product";

const ProductList = ({ products, addToCart }) => {
  return (
    <section className="container mt-5" id="destacados">
      <h2 className="mb-4 text-center">Productos</h2>
      <div className="row">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
