import SignIn from "@/modules/Auth/SignIn";
import Register from "@/modules/Auth/Register";

import { JSX } from "react";

export interface AppRoute {
  path: string;
  element: JSX.Element;
  private?: boolean;
}

export const publicRoutes: AppRoute[] = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
