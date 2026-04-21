import React from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams } from "react-router";
import { categories } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filterProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16 px-4 sm:px-8 md:px-12 lg:px-16">
      {searchCategory && (
        <div className="mb-6">
          <p className="text-2xl font-semibold text-gray-800">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>
        </div>
      )}

      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filterProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-50">
          <p className="text-lg text-gray-500 font-medium">
            No product found
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;