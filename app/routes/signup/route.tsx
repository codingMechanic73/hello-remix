import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { validateCredentials } from "./validation";
import { userCookie } from "~/auth";
import { createAccount } from "./queries";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const errors = await validateCredentials(email, password);
  if (errors) {
    return json({ errors }, {
      status: 401
    })
  }
  const user = await createAccount(email, password);
  return redirect("/", {
    headers: {
      "Set-Cookie": await userCookie.serialize(user.userId)
    }
  });
}

export default function SignUp() {
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
