import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { validateCredentials } from "./validations";
import { loginUser } from "./queries";
import { userCookie } from "~/auth";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const errors = await validateCredentials(email, password);

  if (errors) {
    return json({ errors }, 401)
  }

  const userId = await loginUser(email, password);
  if (!userId) {
    return json({
      errors: {
        email: "Invalid Email or Password",
        password: "Invalid Password"
      },
    },
      401
    )
  }
  return redirect("/", {
    headers: {
      "Set-Cookie": await userCookie.serialize(userId)
    }
  })
}

export default function login() {
  const actionData = useActionData<typeof action>();
  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <Form method="POST">
          <label htmlFor="email">Email Address</label>
          {actionData?.errors?.email && <span>{actionData?.errors?.email}</span>}
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="password">Password</label>
          {actionData?.errors?.password && <span>{actionData?.errors?.password}</span>}
          <input id="password" name="password" type="password" autoComplete="current-password" required />
          <button type="submit">SignIn</button>
        </Form>
      </div>
    </div>
  )
}