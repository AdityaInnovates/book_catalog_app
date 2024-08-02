"use client";
import addToUserWishlist from "@/serverActions/addToUserWishlist";
import getBooks from "@/serverActions/getBooks";
import RealtimeSearchSuggetions from "@/serverActions/RealtimeSearchSuggetions";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Search = () => {
  var router = useRouter();
  var params = useSearchParams();
  const [searchedbooks, setsearchedbooks] = useState([]);
  const [searchedText, setsearchedText] = useState(params.get("query") || "");
  const [debouncingTimeout, setdebouncingTimeout] = useState(null);
  const [SearchSuggestiosArray, setSearchSuggestiosArray] = useState([]);
  const mainSearchInput = useRef(null);
  async function searchProduct(searchedText) {
    setsearchedText(searchedText);
    var data = await getBooks({ query: searchedText });
    setsearchedbooks(data.msg);
  }
  useEffect(() => {
    (async () => {
      var data;
      if (!searchedText) {
        data = await getBooks({ query: searchedText, limit: 10 });
      } else {
        data = await getBooks({ query: searchedText });
      }
      setsearchedbooks(data.msg);
    })();
  }, []);

  return (
    <div className="h-[88.5vh] bg-white overflow-y-scroll">
      <div className="relative bg-slate-100 block w-full h-[4rem] /z-[-1]">
        <div className="absolute bottom-0 left-0 right-0 bg-slate-100 block translate-y-[1.8rem] h-full"></div>
      </div>
      <div className="w-full ">
        <div className="w-full flex justify-center">
          <form
            class="flex items-center w-[50rem]"
            onSubmit={(el) => {
              el.preventDefault();
              searchProduct(el.currentTarget.search.value);
            }}
          >
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                name="search"
                id="voice-search"
                class="bg-white shadow-2xl outline-none  text-gray-900 text-sm rounded-lg block w-full pl-12 py-[1.3rem] px-2.5  "
                placeholder="Search Books, inspirational books, life quotes."
                ref={mainSearchInput}
                onChange={(el) => {
                  clearTimeout(debouncingTimeout);
                  setdebouncingTimeout(
                    setTimeout(async () => {
                      if (el.target.value) {
                        var apires = await RealtimeSearchSuggetions(
                          el.target.value
                        );
                        setSearchSuggestiosArray(apires);
                      } else {
                        setSearchSuggestiosArray([]);
                      }
                    }, 500)
                  );
                }}
              />
              <div className="absolute w-full bg-white flex flex-col justify-center gap-[0.2rem]">
                <hr />
                {SearchSuggestiosArray.map((el) => (
                  <div key={el.title + Math.floor(Math.random() * 999)}>
                    <h3
                      onClick={() => {
                        mainSearchInput.current.value = el.title;
                        setsearchedText(el.title);
                        searchProduct(el.title);
                        setSearchSuggestiosArray([]);
                        router.push(`/search?query=${el.title}`);
                      }}
                      className="hover:bg-[#00a96c] hover:text-white cursor-pointer pb-[0.2rem] px-[0.5rem] "
                    >
                      {el.title}
                    </h3>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center gap-[1rem] my-[2rem]">
          <h3 className="text-4xl " style={{ fontFamily: "staatliches" }}>
            {searchedText ? searchedText : "Books Store"}
          </h3>
          <h3 className="text-gray-700 text-sm">
            Discover top in class books..
          </h3>
        </div>
      </div>
      <div className=" gap-[2rem] grid grid-cols-5 h-[20rem]">
        {searchedbooks.map((el) => (
          <div
            key={el.title + Math.floor(Math.random() * 999)}
            className="group relative  h-[24rem] /border-[1px] flex flex-col gap-[0.5rem] border-slate-200 p-[1rem] rounded-lg cursor-pointer"
          >
            <button
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
            </button>
            <div className=" flex  flex-col bg-[#e4e8e1] rounded-md p-[1rem] aspect-square  items-center justify-center">
              <img
                className="object-contain /w-full h-[12rem] rounded-md"
                src={el.img}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-[0.5rem]">
              <h3
                className="line-clamp-1 font-semibold"
                style={{ fontFamily: "outfit" }}
              >
                {el.title}
              </h3>
              <div className="relative w-[3rem]">
                <div class="h-[2px] bg-orange-500 rounded-xl block w-full"></div>
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
  );
};

export default Search;
