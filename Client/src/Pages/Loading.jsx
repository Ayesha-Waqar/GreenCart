import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router";

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const success = query.get("success");
  const nextUrl = query.get("next") 

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`${nextUrl}`);
      }, 5000);
    } else {
      navigate("/cart");
    }
  }, [success]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-24 h-24 border-4 border-gray-300 border-4 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;