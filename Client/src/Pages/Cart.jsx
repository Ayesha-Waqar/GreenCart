import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { assets, dummyAddress } from "../assets/assets";

const Cart = () => {
  const {
    products,
    UpdateCartItems,
    navigate,
    currency,
    cartItems,
    RemoveFromCart,
    getCartAmount,
    totalCardItems,
  } = useAppContext();

  const [showAddress, setShowAddress] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [Addresses, setAddresses] = useState(dummyAddress);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    const tempArr = [];
    for (let key in cartItems) {
      const product = products.find((item) => item._id == key);
      if (product) {
        tempArr.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArr);
  };

  const placeOrder = async () => {
    // Order placement logic
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            {totalCardItems()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  window.scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <div className="flex items-center">
                    <p>Qty: </p>
                    <select
                      value={product.quantity}
                      onChange={(e) => UpdateCartItems(product._id, Number(e.target.value))}
                      className="outline-none ml-2 bg-transparent"
                    >
                      {Array.from(
                        { length: cartItems[product._id] > 9 ? cartItems[product._id] : 9 },
                        (_, index) => (
                          <option key={index} value={index + 1}>{index + 1}</option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
            <button onClick={() => RemoveFromCart(product._id)} className="cursor-pointer mx-auto">
              <img className="inline-block w-6 h-6" src={assets.remove_icon} alt="Remove" />
            </button>
          </div>
        ))}

        <button
          onClick={() => { navigate("/Products"); window.scrollTo(0, 0); }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img src={assets.arrow_right_icon_colored} alt="" />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-90 w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street} ${selectedAddress.state} ${selectedAddress.city} ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {Addresses.map((address, index) => (
                  <p
                    onClick={() => { setShowAddress(false); setSelectedAddress(address); }}
                    key={index}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state}, {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/AddAddress")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none focus:border-primary"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <div className="flex justify-between">
            <span>Price</span>
            <span>{currency}{getCartAmount()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-primary">Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-3 text-black">
            <span>Total Amount:</span>
            <span>{currency}{getCartAmount() + (getCartAmount() * 0.02)}</span>
          </div>
        </div>

        {/* Using your custom primary and primary-dull classes here */}
        <button 
          onClick={() => placeOrder()}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition shadow-sm active:scale-[0.98]"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Pay"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;