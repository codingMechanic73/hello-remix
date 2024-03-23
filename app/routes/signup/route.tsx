import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { validateCredentials } from "./validation";

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const email =  String(formData.get("email"));
    const password = String(formData.get("password"));
    
    const errors = validateCredentials(email, password);
    return json({errors}, {
      status: 401
    })
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
                <input autoFocus id="email" name="email" type="email" autoComplete="email" required />
                <label htmlFor="password">Password</label>
                {actionData?.errors?.password && <span>{actionData?.errors?.password}</span>}
                <input id="password" name="password" type="password" autoComplete="current-password" required />
                <button type="submit">SignIn</button>
            </Form>
        </div>
    </div>
  )
}
