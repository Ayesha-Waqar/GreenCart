import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext(); // context function

  return (
    <div className="mt-16">
        <h1 className="text-2xl md:text-3xl font-medium">
          Categories
        </h1>{" "}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-7 mt-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
                window.scrollTo(0, 0);
              }}
              className="flex flex-col items-center justify-center min-w-40 h-44 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
              style={{ backgroundColor: category.bgColor }}
            >
              <img
                src={category.image}
                alt={category.text}
                className="w-20 h-20 mb-4"
              />
              <p className="text-gray-800 text-center font-medium text-lg">
                {category.text}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
