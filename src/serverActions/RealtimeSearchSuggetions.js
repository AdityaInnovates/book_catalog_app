"use server";

import dbConnect from "@/lib/Database/dbconnect";
import booksModel from "@/lib/Database/models/booksModel";

const RealtimeSearchSuggetions = async (query) => {
  await dbConnect();
  var dbres = await booksModel
    .find({ title: { $regex: new RegExp(query, "i") } })
    .select("title")
    .limit(4);
  return dbres;
};

export default RealtimeSearchSuggetions;
