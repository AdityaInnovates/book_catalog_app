"use server";

import { cookies } from "next/headers";
import Auth from "./auth/page";

function Shield({ children }) {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  if (token) return children;
  else return Auth();

  //   return children;
}

export default Shield;
