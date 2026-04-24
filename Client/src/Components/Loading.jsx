import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router";

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const success = query.get("success");

  useEffect(() => {
    if (success === "true") {
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } else {
      navigate("/cart");
    }
  }, [success]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;