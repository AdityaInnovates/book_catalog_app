"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import uploadImage from "@/serverActions/uploadImage";
import AddBook from "@/serverActions/AddBook";
const addBook = () => {
  const [userInputs, setuserInputs] = useState({});
  async function submitBookForm() {
    var uploaded = await AddBook(userInputs);
    toast.success("Book published");
  }
  return (
    <div>
      <div className="w-full /w-[100vw] h-[100vh] py-[1.5rem] px-[4rem] bg-white">
        <div className="flex justify-between">
          <h3
            className="text-2xl font-semibold mb-[1rem] ml-[0.5rem]"
            style={{ fontFamily: "outfit" }}
          >
            Add A New Book
          </h3>
          <button
            onClick={submitBookForm}
            className="py-[0.5rem] px-[2rem] bg-green-500 hover:bg-green-600 transition-all duration-200 rounded-md font-semibold tracking-wider text-white"
            style={{ fontFamily: "rubik" }}
          >
            Publish
          </button>
        </div>
        <div className="flex gap-[3rem]">
          <label
            htmlFor="mainBookImage"
            className="p-[1rem] aspect-square h-[14rem] bg-slate-100 rounded-xl /shadow-xl /shadow-2xl group cursor-pointer flex items-center justify-center"
          >
            {userInputs.img ? (
              <img
                className="object-contain /w-full h-[12rem] rounded-md"
                src={userInputs.img}
                alt=""
              />
            ) : (
              <div className="flex flex-col gap-[0.5rem] items-center  justify-center text-slate-400 group-hover:text-slate-500 transition-all duration-300">
                <i class="fi fi-rr-add flex items-center text-[2rem]   "></i>
                <h3>Add image</h3>
              </div>
            )}
          </label>
          <input
            className="hidden"
            type="file"
            id="mainBookImage"
            accept="image/*"
            onChange={async (el) => {
              const id = toast.loading("Uploading...");
              const formData = new FormData();
              formData.append("image", el.currentTarget.files[0]);
              var seclink = await uploadImage(formData);
              setuserInputs((prev) => ({
                ...prev,
                img: seclink.imageURL,
              }));
              toast.update(id, {
                render: "Uploading completed",
                type: "success",
                isLoading: false,
                autoClose: 3000,
              });
            }}
          />
          <div className="flex flex-col /mt-[0.5rem] ">
            <div>
              <h3>Book Title</h3>
              <input
                type="text"
                className="bg-transparent border-b-2 border-slate-400 focus:border-green-500 outline-none w-[20rem] text-xl"
                placeholder="Title"
                value={userInputs?.title || ""}
                onChange={(el) => {
                  setuserInputs((prev) => ({
                    ...prev,
                    title: el.target?.value,
                  }));
                }}
              />
            </div>
            <div className="mt-[4rem] flex flex-col gap-[0.5rem] ">
              <h3>By Author</h3>
              <input
                type="text"
                className="bg-transparent border-b-2 border-slate-400 focus:border-green-500 outline-none w-[20rem] text-xl"
                placeholder="Author"
                value={userInputs?.author || ""}
                onChange={(el) => {
                  setuserInputs((prev) => ({
                    ...prev,
                    author: el.target?.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[0.5rem] mt-[1.5rem]">
          <h3>Description</h3>
          <textarea
            className="bg-transparent border-b-2 border-slate-400 focus:border-green-500 outline-none transition-all duration-200"
            // name=""
            // id=""
            rows={10}
            placeholder="Book's Desciption"
            value={userInputs?.desc || ""}
            onChange={(el) => {
              setuserInputs((prev) => ({
                ...prev,
                desc: el.target?.value,
              }));
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default addBook;
