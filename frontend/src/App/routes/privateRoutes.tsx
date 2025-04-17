import Dashboard from "@/modules/Dashboard";

import ListBarang from "@/modules/Barang/List";
import CreateBarang from "@/modules/Barang/Create";
import UpdateBarang from "@/modules/Barang/Update";

import { JSX } from "react";

export interface AppRoute {
  path: string;
  element: JSX.Element;
  private?: boolean;
}

export const privateRoutes: AppRoute[] = [
  {
    path: "/",
    element: <Dashboard />,
    private: true,
  },
  {
    path: "/barang",
    element: <ListBarang />,
    private: true,
  },
  {
    path: "/barang/create",
    element: <CreateBarang />,
    private: true,
  },
  {
    path: "/barang/:id",
    element: <UpdateBarang />,
    private: true,
  },
];
