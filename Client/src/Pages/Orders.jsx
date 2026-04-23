import React, { useEffect, useState } from "react";
// import { dummyOrders } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [myOrders, setMyorders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyorders = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/order/user");
      console.log(data)
      if (data.success) {
        toast.success(data.message);
        setMyorders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyorders();
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Orders</h1>
        <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>
      </div>

      <div className="space-y-6">
        {myOrders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"
          >
            {/* Order Header */}
            <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Order ID
                </p>
                <p className="text-sm font-medium">#{order._id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Total Amount
                </p>
                <p className="text-sm font-bold text-primary">
                  {currency}
                  {order.amount}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">
                  Payment
                </p>
                <p className="text-sm capitalize">{order.paymentType}</p>
              </div>
            </div>

            {/* Order Items List */}
            <div className="divide-y divide-gray-100">
              {order.items &&
                order.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 shrink-0 border rounded bg-gray-50 overflow-hidden">
                        <img
                          src={item.product?.image?.[0]}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">
                          {item.product?.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Category: {item.product?.category}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <p className="text-sm font-medium text-gray-700">
                          {item.status || "Processing"}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400">
                        Ordered on:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-2 font-semibold text-gray-800">
                        Subtotal: {currency}
                        {item.product?.offerPrice * (item.quantity || 1)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {myOrders.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p>You have no orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
