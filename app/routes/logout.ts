import { redirect } from "@remix-run/node";
import { userCookie } from "~/auth";

export async function action() {
  return redirect("/", {
    headers: {
      "Set-Cookie": await userCookie.serialize("", {
        maxAge: 0
      })
    }
  })
}