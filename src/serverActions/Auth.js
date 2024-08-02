"use server";
import dbConnect from "@/lib/Database/dbconnect";
import usermodel from "@/lib/Database/models/usermodel";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken";
import Crypto from "crypto";

export async function AuthHandler(formData, signup) {
  try {
    await dbConnect();
    const cookieStore = cookies();
    let data = formData;

    let dt = await usermodel.findOne({ email: data.get("email") });

    if (signup) {
      if (dt) return { status: false, msg: "User Already Registered" };

      dt = new usermodel({
        email: data.get("email").toLowerCase(),
        password: Crypto.createHash("md5")
          .update(data.get("password"))
          .digest("hex"),
        name: data.get("name"),
      });

      dt = await dt.save();

      let token = JWT.sign(
        {
          id: dt._id,
          email: data.get("email").toLowerCase(),
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      cookieStore.set("token", token);

      return { status: true, msg: "User Registered Successfully" };
    } else {
      if (!dt) return { status: false, msg: "User Not Registered" };

      let pass = dt.password;
      if (
        pass ==
        Crypto.createHash("md5").update(data.get("password")).digest("hex")
      ) {
        let token = JWT.sign(
          {
            id: dt._id,
            email: data.get("email").toLowerCase(),
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        cookieStore.set("token", token);

        return { status: true, msg: "Authentication succesfull" };
      }
    }
  } catch {
    return { status: false, msg: "Something Broke" };
  }
}
