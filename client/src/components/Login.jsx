import { useState } from "react";
import { FaShopLock } from "react-icons/fa6";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // State for sign-up mode

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const user = await response.json();
      onLogin(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Toggle function for switching between login and sign-up mode
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 w-full h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="rounded-lg shadow-md h-[500px] lg:ml-[5%] my-[30px] items-center justify-center">
        <div className="w-full text-[#022c22] items-center justify-center flex flex-col">
        <FaShopLock  className='text-8xl'/> 
          <h1 className="text-5xl">
            Kis<span className="text-1xl text-[#f59e0b] font-bold ">A</span>sa
          </h1>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full mt-11">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username..."
            className="border border-[#022c22] rounded-sm p-2 outline-none"
          />
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email..."
            className="border border-[#022c22] rounded-sm p-2 outline-none"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password..."
            className="border border-[#022c22] rounded-sm p-2 outline-none"
          />
        </div>
        <div className="flex w-full items-center justify-center mt-7">
          <button
            type="submit"
            className="bg-[#022c22] font-bold text-lg hover:bg-[#f59e0b] hover:text-[#022c22] text-white p-2 w-[130px] py-2 rounded-md"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </div>
        <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={toggleSignUp}
          className="text-[#022c22] mt-4 focus:outline-none"
        >
          {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
        </button>
        </div>
        <div className="flex items-center justify-center mt-11">
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
      <div className="flex items-center lg:mr-[5%] custom_bg_image h-[500px] rounded-lg shadow-md"></div>
    </div>
  );
}

export default Login;
