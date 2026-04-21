import React from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();
      const toogleStock = async (id, inStock) => {
        try {
          const { data } = await axios.put(
            `http://localhost:3000/api/product/changeStock/${id}`,
            { inStock },
          );
          console.log(data)

          if (data.success) {
             toast.dismiss(); 
            toast.success(data.message);
            fetchProducts();
          } else {
            console.log("error in data");
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

  return (
    <div className="flex-1 py-6 md:py-10 flex flex-col">
      <div className="w-full md:px-10 px-4">
        <h2 className="pb-6 text-xl font-semibold text-gray-800">
          All Products
        </h2>

        {/* Table Wrapper for responsiveness */}
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-150 text-sm">
            {/* HEADER */}
            <thead className="bg-gray-50 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">
                  Price
                </th>
                <th className="px-4 py-3 font-semibold">Stock</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition">
                  {/* PRODUCT */}
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    <span className="font-medium text-gray-800 line-clamp-1">
                      {product.name}
                    </span>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-4 py-3">{product.category}</td>

                  {/* PRICE */}
                  <td className="px-4 py-3 hidden sm:table-cell font-medium text-gray-800">
                    {currency}
                    {product.offerPrice}
                  </td>

                  {/* STOCK TOGGLE */}
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        onClick={() => {
                          toogleStock(product._id, !product.inStock);
                        }}
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={product.inStock}
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
