import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate ,axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) navigate("/seller");
  }, [isSeller]);

  const formHandler = async(e) => {
   try{
    e.preventDefault();
    const {data} = await axios.post('http://localhost:3000/api/seller/login', { email, password })
    // console.log(data)
    if(data.success){
       toast.dismiss(); 
      toast.success(data.message);
      setIsSeller(true)
      navigate('/seller')
    }
    else{
     console.log("errorrr in data success")
    }
   }
   catch(error){
     toast.error(error.message);
   }
   
  };

  return (
    !isSeller && (
      <div className="flex items-center justify-center min-h-screen bg-primary/5">
        <form
          onSubmit={formHandler}
          className="flex flex-col gap-4 p-8 sm:w-96 w-80 rounded-xl shadow-lg border border-primary/20 bg-white"
        >
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center text-primary">
            Seller Login
          </h2>

          {/* Email */}
          <div>
            <label className="text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-primary/30 rounded-md outline-none focus:ring-2 focus:ring-primary/40"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-primary/30 rounded-md outline-none focus:ring-2 focus:ring-primary/40"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full h-11 rounded-full bg-primary text-white hover:bg-primary/90 transition"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;