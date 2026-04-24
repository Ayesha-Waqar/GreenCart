import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    totalCardItems,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/user/logout",
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
      
      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All products</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/orders">My Orders</NavLink>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} className="w-4 h-4" alt="search" />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">
            {totalCardItems()}
          </button>
        </div>

        {/* Auth */}
        {!user ? (
          <button
            onClick={() => setShowLogin(true)}
            className="px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer rounded-full border border-gray-300"
              alt="profile"
            />

            <div className="absolute right-0 top-full w-40 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-50">
              <ul className="py-2 text-sm text-gray-800">
                <li
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Right Side */}
      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">
            {totalCardItems()}
          </button>
        </div>

        <button onClick={() => setOpen(!open)}>
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-3 px-5 text-sm sm:hidden`}
      >
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)}>
          All products
        </NavLink>

        {user && (
          <NavLink to="/orders" onClick={() => setOpen(false)}>
            My Orders
          </NavLink>
        )}

        <NavLink to="/contact" onClick={() => setOpen(false)}>
          Contact
        </NavLink>

        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowLogin(true);
            }}
            className="px-6 py-2 mt-2 bg-primary text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="px-6 py-2 mt-2 bg-primary text-white rounded-full"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;