import { useState } from "react";
import { FaShopLock } from "react-icons/fa6";

function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5556/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }
      onLogin();
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

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 w-full h-full lg:h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="rounded-lg w-full lg:shadow-md lg:h-[500px] lg:ml-[5%] my-[30px] items-center justify-center">
        <div className="w-full text-[#022c22] items-center justify-center flex flex-col">
          <FaShopLock  className='text-8xl'/>
          <h1 className="text-5xl">
            Kis<span className="text-1xl text-[#f59e0b] font-bold ">A</span>sa
          </h1>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center w-full mt-11">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username..."
            className="border border-[#022c22] rounded-sm p-2 outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email..."
            className="border border-[#022c22] rounded-sm p-2 outline-none"
          />
          <input
            type="password"
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
            Sign Up
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
      <div className="flex  items-center lg:mr-[5%] custom_bg_image  lg:h-[500px] rounded-lg shadow-md"></div>
    </div>
  );
}

export default Signup;
