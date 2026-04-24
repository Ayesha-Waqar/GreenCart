import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    totalCardItems,
    axios
  } = useAppContext();

  const logout = async() => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/user/logout" , {withCredentials:true});
      console.log(data);
      if (data.success) {
      toast.dismiss(); 
      toast.success(data.message);
        setUser(null)
        navigate('/')
      }
      else{
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
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Products">All products</NavLink>
        <NavLink to="/Contact">Contact</NavLink>
        <NavLink to="/Orders">My Orders</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} className="w-4 h-4" />
        </div>

        <div
          onClick={() => {
            navigate("/Cart");
          }}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">
            {totalCardItems()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
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
                  onClick={() => navigate("Orders")}
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer "
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

      <div className="flex items-center gap-6 sm:hidden">
        <div
          onClick={() => {
            navigate("/Cart");
          }}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">
            {totalCardItems()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          <img src={assets.menu_icon} />
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`${open ? "flex" : "hidden"} absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/Products" onClick={() => setOpen(false)}>
          All products
        </NavLink>
        {user && (
          <NavLink to="/Products" onClick={() => setOpen(false)}>
            My Orders
          </NavLink>
        )}
        <NavLink to="/Contact" onClick={() => setOpen(false)}>
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
            onClick={logout}
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
