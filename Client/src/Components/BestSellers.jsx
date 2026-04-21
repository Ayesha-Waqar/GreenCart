import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../Context/AppContext";

const BestSellers = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <h2 className="text-2xl md:text-3xl font-medium">Best Sellers</h2>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSellers;