"use server";

import dbConnect from "@/lib/Database/dbconnect";
import booksModel from "@/lib/Database/models/booksModel";

const getBooks = async (params) => {
  var { query } = params;
  var limit = params?.limit || null;
  await dbConnect();
  if (limit) {
    var datatosend = await booksModel
      .find({
        $or: [
          { title: { $regex: new RegExp(query, "i") } },
          { author: { $regex: new RegExp(query, "i") } },
          {
            desc: { $regex: new RegExp(query, "i") },
          },
        ],
      })
      .limit(limit);
  } else {
    var datatosend = await booksModel.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { author: { $regex: new RegExp(query, "i") } },
        {
          desc: { $regex: new RegExp(query, "i") },
        },
      ],
    });
  }
  return { success: true, msg: datatosend };
};

export default getBooks;
