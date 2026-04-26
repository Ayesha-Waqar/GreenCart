import { Routes, Route, useLocation } from "react-router";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer";
import { useAppContext } from "./Context/AppContext";
import Login from "./Components/Login";
import Products from "./Pages/Products";
import ProductCategory from "./Pages/ProductCategory";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AddAddress from "./Pages/AddAddress";
import Orders from "./Pages/Orders";
import SellerLogin from "./Components/Seller/SellerLogin";
import SellerLayout from "./Pages/Seller/SellerLayout"
import AllProducts from "./Pages/Seller/AddProducts";
import SellerOrders from "./Pages/Seller/SellerOrders";
import AddProducts from "./Pages/Seller/AddProducts";
import ProductList from "./Pages/Seller/ProductList";
import Loading from "./Components/Loading";
import Contact from "./Pages/Contact";

const App = () => {
  const { showLogin, isSeller } = useAppContext();
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <>
      {isSellerPath ? null : <NavBar />}
      {showLogin ? <Login /> : null}
      <Toaster />
      <div
        className={`${isSellerPath ? "" : "w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/AddAddress" element={<AddAddress />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Loader" element={<Loading />} />

          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProducts /> : null} />
            <Route path="SellerOrders" element={<SellerOrders /> } />
            <Route path="AddProducts" element={<AddProducts/> } />
            <Route path="ProductList" element={<ProductList /> } />
          </Route>
        </Routes>
      </div>
      {isSellerPath ? null : <Footer />}
    </>
  );
};

export default App;
  