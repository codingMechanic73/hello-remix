import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { userCookie } from "~/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieString = request.headers.get("Cookie");
  const userId = await userCookie.parse(cookieString);
  return {
    userId
  }
}

export default function Index() {
  const { userId } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <nav>
        {
          userId ? (<form action="/logout" method="post">
            <button type="submit">Logout</button>
          </form>) : (<div>Login</div>)
        }
      </nav>
      <ul>
        <li>
          <Link to={"/signup"}>Sign Up</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </div>
  );
}
