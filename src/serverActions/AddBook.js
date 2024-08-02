"use server";
import dbConnect from "@/lib/Database/dbconnect";
import booksModel from "@/lib/Database/models/booksModel";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

const AddBook = async (bookDetails) => {
  await dbConnect();
  const cookieStore = cookies();
  if (cookieStore.has("token")) {
    try {
      JWT.verify(cookieStore.get("token").value, process.env.JWT_SECRET);
      var tosave = new booksModel(bookDetails);
      await tosave.save();
      return { status: true };
    } catch (error) {
      return { status: false };
    }
  }
};

export default AddBook;
