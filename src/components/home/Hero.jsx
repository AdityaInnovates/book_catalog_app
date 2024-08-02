"use client";
import RealtimeSearchSuggetions from "@/serverActions/RealtimeSearchSuggetions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Hero = () => {
  var router = useRouter();
  const [HeroBooks, setHeroBooks] = useState([
    {
      img: "https://m.media-amazon.com/images/I/71XpkRq0ncL._SY425_.jpg",
      title: "Think Straight",
      author: "Darius Foroux",
      zIndex: "3",
    },
    {
      img: "https://m.media-amazon.com/images/I/71v+XHt82DL._SY425_.jpg",
      title: "THE ART OF HAPPINESS",
      author: "Howard C. Cutler, Dalai Lama",
      zIndex: "1",
    },
    {
      img: "https://m.media-amazon.com/images/I/71dNsRuYL7L._SY425_.jpg",
      title: "YOU ONLY LIVE ONCE",
      author: "Stuti Changle",
      zIndex: "2",
    },
  ]);
  const [SearchSuggestiosArray, setSearchSuggestiosArray] = useState([]);
  const [debouncingTimeout, setdebouncingTimeout] = useState(null);
  return (
    <div>
      <div className="w-full h-[100vh] flex items-center justify-center relative">
        <div className="absolute w-full h-full flex">
          <div className="w-[50%] h-full bg-[rgb(237,238,236)]" />
          <div className="w-[50%] h-full flex">
            <div className="w-[33.3%] h-full bg-[rgb(234,235,231)]"></div>
            <div className="w-[33.3%] h-full bg-[rgb(228,232,225)]"></div>
            <div className="w-[33.3%] h-full bg-[rgb(220,223,216)]"></div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex /gap-[20rem] w-[60%] /w-[35rem] items-center justify-center  h-full relative">
            <div className="max-w-[30rem]">
              <div className="flex flex-col gap-[2rem]">
                <h3
                  className="text-[3rem] font-semibold"
                  style={{ fontFamily: "outfit" }}
                >
                  {`Reading is a journey that never ends, only begins again`}
                </h3>
                <h3 className="max-w-[25rem]" style={{ fontFamily: "poppins" }}>
                  Each book opens a door to a new world, inviting us to step
                  through and explore its endless possibilities and adventures.
                </h3>
                <div>
                  <div className="relative w-[25rem]">
                    <input
                      type="text"
                      placeholder="Search Books"
                      className="px-[1rem] py-[1rem] w-full outline-none"
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
                    <button
                      style={{ fontFamily: "outfit" }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 py-[0.5rem] mr-[0.5rem] bg-[#00a96c] text-white px-[2rem]"
                    >
                      Search
                    </button>
                    <div className="absolute w-full bg-white flex flex-col justify-center gap-[0.2rem]">
                      <hr />
                      {SearchSuggestiosArray.map((el) => (
                        <div key={el.title + Math.floor(Math.random() * 999)}>
                          <h3
                            onClick={() => {
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
                </div>
              </div>
            </div>
            <div className="absolute right-[-5rem]">
              <div className="relative flex items-center justify-center">
                {HeroBooks.map((el, index) => (
                  <div
                    key={el.title + Math.floor(Math.random() * 999)}
                    className="absolute  w-[15rem]  "
                    style={{
                      transform:
                        index == 0
                          ? ""
                          : index == 1
                          ? `translateX(${170 * index}px)`
                          : index == 2
                          ? `translateX(${40 * index}px)`
                          : "",
                      scale: `${index !== 0 ? index / (index + 0.3) : 1}`,
                      zIndex: `${el.zIndex}`,
                    }}
                  >
                    <div className="flex  items-center justify-center relative">
                      <img
                        className="/w-[10rem] shadow-2xl rounded-xl"
                        src={el.img}
                        alt=""
                      />
                      {index == 0 ? (
                        <div className="absolute -bottom-[4rem] left-0">
                          <h3
                            className="font-semibold text-[1.4rem]"
                            style={{ fontFamily: "outfit" }}
                          >
                            {el.title}
                          </h3>
                          <h3
                            className="text-slate-500"
                            style={{ fontFamily: "poppins" }}
                          >
                            {el.author}
                          </h3>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
