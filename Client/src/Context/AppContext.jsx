import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { assets, dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get(
        "/api/seller/isAuth");
      console.log(data);
      if (data.success) {
        toast.dismiss();
        toast.success(data.message);
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error.message);
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        "/api/user/isAuth",
      );
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems); // DB se cart load
        setIsCartLoaded(true); // flag set karo
      } else {
        setUser(null);
        setIsCartLoaded(true); // guest ke liye bhi set karo
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong");
      setIsCartLoaded(true); // error pe bhi set karo..warna save kabhi nahi hoga
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "/api/product/getProducts",
      );
      // console.log(data)
      if (data.success) {
        setProducts(data.products);
      } else {
        console.log("errorrr in data success");
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const UpdateCartItems = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const RemoveFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] == 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Item Deleted");
  };

  const totalCardItems = () => {
    let itemCount = 0;
    for (const item in cartItems) {
      itemCount += cartItems[item];
    }
    return itemCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }

    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

  // update cart items in db
  useEffect(() => {
    if (!user) return;           // skip guest
    if (!isCartLoaded) return;   //Wa8 to complete fetch

    const updateCart = async () => {
      try {
        const { data } = await axios.post(
          "/api/cart/update",
          { cartItems }
        );
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    updateCart();
  }, [cartItems, isCartLoaded]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showLogin,
    setShowLogin,
    products,
    currency,
    cartItems,
    addToCart,
    UpdateCartItems,
    RemoveFromCart,
    searchQuery,
    setSearchQuery,
    totalCardItems,
    getCartAmount,
    axios,
    fetchProducts,
    fetchUser,
    setCartItems,
  setIsCartLoaded,

  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export const useAppContext = () => {
  return useContext(appContext);
};
