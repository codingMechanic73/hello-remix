import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("email:", email);
    console.log("password: ", password);
    return null;
}

export default function SignUp() {
  return (
    <div>
        <h2>Sign Up</h2>
        <div>
            <Form method="POST">
                <label htmlFor="email">Email Address</label>
                <input autoFocus id="email" name="email" type="email" autoComplete="email" required />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required />
                <button type="submit">SignIn</button>
            </Form>
        </div>
    </div>
  )
}
