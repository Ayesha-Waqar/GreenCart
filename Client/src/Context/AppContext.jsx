import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { assets, dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.BACKEND_URL;

export const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/seller/isAuth",
        { withCredentials: true },
      );
      console.log(data);
      if (data.success) {
        toast.dismiss();
        toast.success(data.message);
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const fetchUser = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:3000/api/user/isAuth",
  //       { withCredentials: true },
  //     );
  //     console.log(data);
  //     if (data.success) {
  //       toast.dismiss();
  //       toast.success(data.message);
  //       setUser(data.user);
  //       setCartItems(data.user.cartItems || {});
  //     } else {
  //       console.log("error in data ");
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };
 
 
  const fetchUser = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/user/isAuth",
      { withCredentials: true }
    );
    console.log("fetch userrrrr" , data)
    if (data.success) {
      setUser(data.user);
            console.log(data.user)
      setCartItems(data.user.cartItems || {}); // DB se cart load
               console.log(cartItems)
      setIsCartLoaded(true); // flag set karo
    } else {
      setUser(null);
      setIsCartLoaded(true); // guest ke liye bhi set karo
    }
  } catch (error) {
    toast.error(error.message);
    setIsCartLoaded(true); // error pe bhi set karo..warna save kabhi nahi hoga
  }
};

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/product/getProducts",
      );
      // console.log(data)
      if (data.success) {
        toast.dismiss();
        toast.success(data.message);
        setProducts(data.products);
      } else {
        console.log("errorrr in data success");
      }
    } catch (error) {
      toast.error(error.message);
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
        "http://localhost:3000/api/cart/update",
        { cartItems }
      );
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  updateCart();
}, [cartItems, isCartLoaded]); 

// useEffect(() => {
//   const getCartItems = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:3000/api/cart/get");

//       console.log("get cart ", data);

//       if (data.success) {
//         setCartItems(data.cartItems || {}); 
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   getCartItems(); 
// }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showLogin,
    setShowLogin ,
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
    setCartItems
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export const useAppContext = () => {
  return useContext(appContext);
};
