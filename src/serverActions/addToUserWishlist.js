"use server";

import dbConnect from "@/lib/Database/dbconnect";
import usermodel from "@/lib/Database/models/usermodel";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

const addToUserWishlist = async (bookDetails) => {
  await dbConnect();
  const cookieStore = cookies();
  var user = JWT.verify(cookieStore.get("token").value, process.env.JWT_SECRET);
  await usermodel.findByIdAndUpdate(user.id, {
    $push: { wishlist: bookDetails },
  });
};

export default addToUserWishlist;
