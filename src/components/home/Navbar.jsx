"use client";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  var router = useRouter();
  return (
    <div
      className={`w-full /h-[6rem] z-[10] ${
        usePathname() == "/" ? "absolute bg-transparent" : "relative bg-white"
      } top-0 left-0 right-0  /flex items-center `}
    >
      <div className="flex justify-between px-[3rem] py-[1rem]">
        <div className="w-[3rem] h-[3rem] bg-green-500 rounded-full text-white flex items-center justify-center">
          <i class="fi fi-rr-books flex items-center"></i>
        </div>
        <div className="flex  items-center justify-center">
          <div className="flex gap-[1rem] text-md items-center justify-center">
            <h3
              onClick={() => router.push("/")}
              className="px-[0.5rem] cursor-pointer border-b-2 border-slate-400"
              style={{ fontFamily: "outfit" }}
            >
              Home
            </h3>
            <h3
              onClick={() => router.push("/addBook")}
              className="px-[0.5rem] cursor-pointer hover:border-opacity-100 border-opacity-0 border-b-2 border-slate-400 transition-all duration-300"
              style={{ fontFamily: "outfit" }}
            >
              Add Books
            </h3>
            <h3
              onClick={() => router.push("/search")}
              className="px-[0.5rem] cursor-pointer hover:border-opacity-100 border-opacity-0 border-b-2 border-slate-400 transition-all duration-300"
              style={{ fontFamily: "outfit" }}
            >
              Search Books
            </h3>
            <h3
              onClick={() => router.push("/favorites")}
              className="px-[0.5rem] cursor-pointer hover:border-opacity-100 border-opacity-0 border-b-2 border-slate-400 transition-all duration-300"
              style={{ fontFamily: "outfit" }}
            >
              Favorite books
            </h3>
            <h3
              className="px-[0.5rem] cursor-pointer hover:border-opacity-100 border-opacity-0 border-b-2 border-slate-400 transition-all duration-300"
              style={{ fontFamily: "outfit" }}
            >
              About us
            </h3>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
