import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { assets, dummyOrders } from "../../assets/assets";
import toast from "react-hot-toast";

const SellerOrders = () => {
  const { currency, axios, navigate } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/order/seller",
      );
      console.log("  alll orderss  ", data);
      if (data.success) {
        toast.success(data.message);
        setOrders(data.orders);
        // navigate('/Orders')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Orders List</h2>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] items-start md:items-center gap-4 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="hidden md:flex justify-center">
              <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img
                  className="w-full h-full object-cover"
                  src={order.items?.[0]?.product?.image?.[0] || assets.box_icon}
                  alt="product"
                />
              </div>
            </div>

            {/* Items Section */}
            <div className="space-y-1">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-sm font-medium text-gray-700">
                  {item.product.name}{" "}
                  <span className="text-primary ml-1">x {item.quantity}</span>
                </p>
              ))}
              <p className="text-xs text-gray-500 mt-2">
                {new Date(order.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "medium",
                })}
              </p>
            </div>

            {/* Address Section */}
            <div className="text-sm leading-relaxed text-gray-600">
              <p className="font-semibold text-gray-800 mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="line-clamp-2">
                {order.address.street}, {order.address.city},{" "}
                {order.address.state}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* Amount Section */}
            <div className="md:text-center">
              <p className="text-lg font-bold text-gray-900">
                {currency}
                {order.amount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {order.paymentType}
              </p>
            </div>

            {/* Status/Action Section */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${order.isPaid ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
              >
                {order.isPaid ? "● Paid" : "● Pending"}
              </span>
              <button className="text-xs text-primary hover:underline font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrders;
