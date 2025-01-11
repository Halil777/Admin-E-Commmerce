import { FaReact } from "react-icons/fa6";
import { InputWithLabel, SimpleInput } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import Notification from "./common/Notification";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const navigate = useNavigate(); // Use the hook for navigation

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin123!") {
      setNotification({ message: "Login successful!", type: "success" });
      setTimeout(() => {
        // Navigate to the categories page after 3 seconds
        navigate("/admin/categories");
      }, 3000);
    } else {
      setNotification({ message: "Invalid email or password!", type: "error" });
    }
  };

  return (
    <div className="w-[500px] h-auto dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
      <div className="flex flex-col items-center gap-10">
        <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
        <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
          Welcome to the Admin Panel!
        </h2>

        <div className="w-full flex flex-col gap-5">
          <InputWithLabel label="Email">
            <SimpleInput
              type="email"
              placeholder="Enter a email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWithLabel>

          <InputWithLabel label="Password">
            <SimpleInput
              type="password"
              placeholder="Enter a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWithLabel>
        </div>

        <button
          onClick={handleLogin} // Trigger login logic on button click
          className={`dark:bg-whiteSecondary w-full py-2 dark:text-blackPrimary text-whiteSecondary font-semibold   dark:hover:bg-white hover:bg-gray-800 bg-blackPrimary duration-200 flex items-center justify-center gap-x-2`}
        >
          Login
        </button>

        <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
          Not registered yet?{" "}
          <Link
            to="/admin/register"
            className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
          >
            Register <FaArrowRight className="mt-[2px]" />
          </Link>
        </p>
      </div>

      {/* Show notification if exists */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default LoginComponent;
