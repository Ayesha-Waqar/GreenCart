import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
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
        toast.dismiss();
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-medium"
      : "hover:text-primary transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-4 border-b border-gray-300 bg-white ">
      {/* Logo */}
      <NavLink
        to="/"
        onClick={() => setOpen(false)}
        className="mr-3 lg:mr-6"
      >
        <img
          src={assets.logo}
          alt="logo"
          className="h-8 sm:h-9 w-auto object-contain"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8 ">
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>

        <NavLink to="/Products" className={navLinkStyle}>
          All Products
        </NavLink>

        <NavLink to="/Contact" className={navLinkStyle}>
          Contact
        </NavLink>

        {user && (
          <NavLink to="/Orders" className={navLinkStyle}>
            My Orders
          </NavLink>
        )}

        {/* Search */}
        <div className="hidden xl:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full w-[220px] xl:w-[260px]">
          <input
           
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
             value={searchQuery}
            placeholder="Search products"
          />
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 opacity-70"
          />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/Cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />

          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
            {totalCardItems()}
          </button>
        </div>

        {/* Auth */}
        {!user ? (
          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full whitespace-nowrap"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 h-10 cursor-pointer rounded-full border border-gray-300"
              alt="profile"
            />

            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2 text-sm text-gray-800">
                <li
                  onClick={() => navigate("/Orders")}
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

      {/* Mobile Right Section */}
      <div className="flex items-center gap-4 md:hidden">
        <div
          onClick={() => navigate("/Cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />

          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center">
            {totalCardItems()}
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden"
        >
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="8"
              y="6"
              width="13"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"
          } absolute top-full left-0 w-full bg-white shadow-lg py-4 flex-col items-start gap-3 px-5 text-sm md:hidden z-50 border-t border-gray-100`}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="w-full py-2 hover:text-primary transition"
        >
          Home
        </NavLink>

        <NavLink
          to="/Products"
          onClick={() => setOpen(false)}
          className="w-full py-2 hover:text-primary transition"
        >
          All Products
        </NavLink>

        {user && (
          <NavLink
            to="/Orders"
            onClick={() => setOpen(false)}
            className="w-full py-2 hover:text-primary transition"
          >
            My Orders
          </NavLink>
        )}

        <NavLink
          to="/Contact"
          onClick={() => setOpen(false)}
          className="w-full py-2 hover:text-primary transition"
        >
          Contact
        </NavLink>

        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

