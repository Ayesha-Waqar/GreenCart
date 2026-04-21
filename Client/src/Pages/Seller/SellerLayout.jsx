import { assets } from "../../assets/assets";
import { useAppContext } from "../../Context/AppContext";
import { Link, NavLink, Outlet } from "react-router";
import toast from "react-hot-toast";

const SellerLayout = () => {
  // console.log("here")
  const { setIsSeller ,axios , navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",  
      path: "/seller/productlist",
      icon: assets.product_list_icon,
    },
    { name: "Seller-Orders", path: "/seller/SellerOrders", icon: assets.order_icon },
  ];

  const logoutButton = async() => {
    try{
    const {data} = await axios.get('http://localhost:3000/api/seller/logout')
    // console.log(data)
    if(data.success)
    {
      // setIsSeller(false)
       toast.dismiss(); 
      toast.success(data.message);
      console.log("Logged out")
      navigate('/')
    }
    else{
      console.log("error in data")
    }

    }
    catch(error){   
   toast.error(error.message);
   }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <div className="flex items-center justify-between px-6 md:px-10 py-3 border-b border-gray-200 bg-white shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-8" />
          <span className="font-semibold text-gray-700 hidden sm:block">    
            Seller Panel
          </span>   
        </Link>
        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-sm hidden sm:block">
            Hi, Admin
          </p>
          <button
            onClick={logoutButton}
            className="bg-primary text-white px-4 py-1.5 rounded-full text-sm hover:bg-primary/90 transition shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        <div className="md:w-64 w-16 bg-white border-r border-gray-200 pt-6 flex flex-col gap-1 shadow-sm">
          
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-5 h-5 opacity-80" />
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <div className="flex-1 p-6 md:p-8 bg-gray-50">
          <div className="bg-white rounded-xl shadow-sm p-5 min-h-[80vh]">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellerLayout;