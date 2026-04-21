import React, { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import ProductCard from "../Components/ProductCard";

const Products = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilterProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <div className="mt-16 px-4 sm:px-8 md:px-16 flex flex-col gap-6">
      {/* Heading */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-800">All Products</p>
        <div className="w-16 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;