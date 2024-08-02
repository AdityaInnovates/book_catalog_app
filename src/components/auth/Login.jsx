"use client";
import { useState } from "react";
import {
  EyeIcon,
  MailIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { AuthHandler } from "@/serverActions/Auth";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [signup, setSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage("");

    const formData = new FormData(e.target);
    if (!signup && formData.get("email").length >= 5) {
      let res = await AuthHandler(formData, signup);
      if (!res.status) setMessage(res.msg);
      toast.success("Login sucessfull");
      return;
    }
    if (
      formData.get("email").length >= 5 &&
      formData.get("email").length >= 4 &&
      formData.get("password") == formData.get("confirmPassword")
    ) {
      let res = await AuthHandler(formData, signup);
      if (!res.status) setMessage(res.msg);
      toast.success("Signup sucessfull");
    } else setMessage("Incomplete Details");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#dde5f4] select-none w-full transition-all duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-[#f1f7fe] p-8 flex flex-col rounded-3xl shadow-lg gap-8 h-fit py-10 max-h-[450px] flex-wrap transition-all duration-300"
      >
        <div className="bg-white shadow-lg p-4 flex flex-col gap-2 rounded-xl text-[#4d4d4d]">
          <label htmlFor="email" className="text-[13px] font-medium">
            Email Address
          </label>
          <div className="flex items-center gap-2">
            <MailIcon className="w-5 h-5 text-[#4d4d4d]" />
            <input
              type="email"
              name="email"
              placeholder="Username@gmail.com"
              className="outline-none border-none text-black text-sm w-full"
            />
          </div>
        </div>

        <div className="bg-white shadow-lg p-4 flex flex-col gap-2 rounded-xl text-[#4d4d4d]">
          <label htmlFor="password" className="text-[13px] font-medium">
            Password
          </label>
          <div className="flex items-center gap-2">
            <LockClosedIcon className="w-5 h-5 text-[#4d4d4d]" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="············"
              className="outline-none border-none text-black text-sm w-full"
            />
            <EyeIcon
              className="w-5 h-5 text-[#4d4d4d] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {signup && (
          <>
            <div className="bg-white shadow-lg p-4 flex flex-col gap-2 rounded-xl text-[#4d4d4d]">
              <label
                htmlFor="confirmPassword"
                className="text-[13px] font-medium"
              >
                Confirm Password
              </label>
              <div className="flex items-center gap-2">
                <LockClosedIcon className="w-5 h-5 text-[#4d4d4d]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="············"
                  className="outline-none border-none text-black text-sm w-full"
                />
              </div>
            </div>
            <div className="bg-white shadow-lg p-4 flex flex-col gap-2 rounded-xl text-[#4d4d4d]">
              <label htmlFor="name" className="text-[15px] font-medium">
                Name
              </label>
              <div className="flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5 text-[#4d4d4d]" />
                <input
                  type="text"
                  name="name"
                  placeholder="Sam"
                  className="outline-none border-none text-black text-sm w-full"
                />
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-[#00a96c] text-white p-4 rounded-3xl font-semibold"
        >
          {signup ? "Sign Up" : "Login"}
        </button>

        <div className="flex justify-center text-xs text-[#5e5e5e]">
          <span onClick={() => setSignup(!signup)} className="cursor-pointer">
            {signup ? "Log in" : "Sign up"}
          </span>
        </div>
        {message && (
          <div className="mt-4 text-center text-red-500">{message}</div>
        )}
      </form>
    </div>
  );
}
