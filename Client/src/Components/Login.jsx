import React from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setShowLogin, setUser, axios, navigate } = useAppContext();
  const location = useLocation();

  const isSellerPath = location.pathname.includes("seller");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        state === "login"
          ? "http://localhost:3000/api/user/login"
          : "http://localhost:3000/api/user/register";

      const payload =
        state === "login"
          ? { email, password }
          : { name, email, password };

      const { data } = await axios.post(url, payload, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        setShowLogin(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/70"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 sm:w-96 w-80 rounded-lg shadow-xl border border-primary bg-white"
      >
        <h2 className="text-2xl font-semibold m-auto">
          <span className="text-primary">
            {isSellerPath ? "Seller" : "User"}
          </span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "register" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2 rounded"
            required
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="border p-2 rounded"
          required
        />

        <button className="bg-primary text-white p-2 rounded">
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() =>
            setState(state === "login" ? "register" : "login")
          }
          className="text-center text-sm cursor-pointer"
        >
          Switch to {state === "login" ? "Register" : "Login"}
        </p>
      </form>
    </div>
  );
};
 
export default Login;