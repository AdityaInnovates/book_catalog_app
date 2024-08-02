"use client";
import addToUserWishlist from "@/serverActions/addToUserWishlist";
import getBooks from "@/serverActions/getBooks";
import React, { useEffect, useState } from "react";

const BooksCatalogue = () => {
  const [DEMOBooks, setDEMOBooks] = useState([]);
  useEffect(() => {
    (async () => {
      var data = await getBooks({ query: "LIFE", limit: 5 });
      setDEMOBooks(data.msg);
    })();
  }, []);

  return (
    <div>
      <div className="mb-[5rem] mt-[3rem] px-[1rem]">
        <h3
          className="font-semibold text-3xl ml-[0.9rem]"
          style={{ fontFamily: "rubik" }}
        >
          Best Seller Books
        </h3>
        <div className="mt-[1rem]">
          <div className=" gap-[2rem] grid grid-cols-5 h-[20rem]">
            {DEMOBooks.map((el) => (
              <div
                key={el.title + Math.floor(Math.random() * 999)}
                className="group relative /border-[1px] flex flex-col gap-[0.5rem] border-slate-200 p-[1rem] rounded-lg cursor-pointer"
              >
                <div
                  onClick={async () => {
                    var addedtowaitlist = await addToUserWishlist(el);
                    toast.success("Added to your favorites");
                  }}
                  className="absolute top-0 right-[1.5rem] mt-[1.35rem]"
                >
                  <svg
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="bookmark"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    stroke="#000"
                    stroke-width="4"
                    stroke-opacity="1"
                    fill="currentColor"
                    className="ribbon  svg-inline--fa fa-bookmark ribbon--left absolute -top-[6px] right-2 !w-[30px]  aspect-square w-[40px] hover:text-[#00DEFF] transition-all duration-300 cursor-pointer text-[#fff7]"
                  >
                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                  </svg>
                </div>
                <div className=" flex flex-col bg-[#e4e8e1] rounded-md p-[1rem] aspect-square  items-center justify-center">
                  <img
                    className="object-contain /w-full h-[12rem] rounded-md"
                    src={el.img}
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  <h3
                    className="font-semibold"
                    style={{ fontFamily: "outfit" }}
                  >
                    {el.title}
                  </h3>
                  <div className="relative w-[3rem]">
                    <div className="h-[2px] bg-orange-500 rounded-xl block w-full"></div>
                    <div className="absolute group-hover:right-[84%] right-0 top-1/2 -translate-y-1/2 rounded-full w-[0.5rem] h-[0.5rem] bg-orange-500 transition-all duration-300"></div>
                  </div>
                  <div className="relative text-slate-500  group-hover:h-[3.5rem]   transition-all duration-300">
                    <h3
                      className="text-sm absolute group-hover:opacity-0   transition-all duration-300"
                      style={{ fontFamily: "poppins" }}
                    >
                      {el.author}
                    </h3>
                    <h3
                      className="text-sm absolute line-clamp-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ fontFamily: "poppins" }}
                    >
                      {el.desc}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksCatalogue;
