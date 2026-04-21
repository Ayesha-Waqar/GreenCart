import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../Components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  // Discount Calculation
  const discount = product
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  useEffect(() => {
    if (products.length > 0 && product) {
      const filtered = products.filter(
        (item) => item.category === product.category && item._id !== id,
      );
      setRelatedProducts(filtered.slice(0, 4));
    }
  }, [products, product, id]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="mt-20 text-center text-gray-500">Loading product...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 mb-20">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-sm text-gray-400 items-center gap-2 font-medium">
        <Link to="/" className="hover:text-primary-clr transition">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
        {/* Left: Images */}
        <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {product.image?.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className={`w-20 h-20 shrink-0 border-2 rounded-xl cursor-pointer p-1 transition-all ${
                  thumbnail === image
                    ? "border-primary-clr bg-white"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden flex items-center justify-center p-8 min-h-100">
            <img
              src={thumbnail}
              alt={product.name}
              className="max-h-100 w-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-2">
            <span className="text-xs font-bold text-primary-clr bg-primary-dull px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-primary-dull mb-4 tracking-tight">
            {product.name}
          </h1>

          {/* Price Section - Clean & Decent */}
          <div className="flex flex-col gap-1 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-primary-dull">
                {currency}
                {product.offerPrice}
              </span>
              <span className="text-lg font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                -{discount}%
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-lg">
                M.R.P:{" "}
                <span className="line-through">
                  {currency}
                  {product.price}
                </span>
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-800 uppercase mb-4 tracking-widest border-b border-gray-100 pb-2">
              About Product
            </h3>
            <ul className="space-y-3">
              {product.description?.map((desc, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                  {desc}
                </li>
              ))}
            </ul>
          </div>

          {/* Standard Modern Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => addToCart(product._id)}
              className="flex-1 h-14 bg-white border-2 border-primary-dull text-primary-dull font-bold rounded-xl hover:bg-primary-dull hover:text-white transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/Cart");
              }}
              className="flex-1 h-14 bg-white border-2 border-primary-dull text-primary-dull font-bold rounded-xl hover:bg-primary-dull hover:text-white transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-6 flex items-center gap-6 text-xs text-gray-500 font-medium border-t border-gray-50 pt-6">
            <div className="flex items-center gap-2">✅ Original Product</div>
            <div className="flex items-center gap-2">🚚 Fast Delivery</div>
          </div>
        </div>
      </div>

      {/* --- Related Products Section --- */}
      <div className="mt-32">
        <h2 className="text-2xl font-bold text-primary-dull mb-8 px-2">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts
            .filter((product) => product.inStock)
            .map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  onClick={() =>
                    navigate(`/products/${item.category}/${item._id}`)
                  }
                  className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4 cursor-pointer"
                >
                  <img
                    src={item.image[0]}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <h3
                  onClick={() =>
                    navigate(`/products/${item.category}/${item._id}`)
                  }
                  className="font-bold text-gray-800 truncate cursor-pointer hover:text-primary-clr transition"
                >
                  {item.name}
                </h3>

                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-primary-clr font-bold text-xl leading-none">
                      {currency}
                      {item.offerPrice}
                    </p>
                    <p className="text-xs text-gray-400 line-through mt-1">
                      {currency}
                      {item.price}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item._id);
                    }}
                    className="px-4 py-2 bg-primary-dull text-white text-xs font-bold rounded-lg hover:bg-primary-clr transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-primary-dull text-white text-sm font-bold rounded-lg hover:bg-primary-clr transition-colors"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
