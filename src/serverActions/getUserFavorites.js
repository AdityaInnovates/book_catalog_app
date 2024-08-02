"use server";

import dbConnect from "@/lib/Database/dbconnect";
import usermodel from "@/lib/Database/models/usermodel";
import JWT from "jsonwebtoken";
import { cookies } from "next/headers";

const getUserFavorites = async () => {
  await dbConnect();
  const cookieStore = cookies();
  var user = JWT.verify(cookieStore.get("token").value, process.env.JWT_SECRET);
  var curentuser = await usermodel.findById(user.id, { wishlist: 1, _id: 0 });
  return curentuser.wishlist.reverse();
};

export default getUserFavorites;
