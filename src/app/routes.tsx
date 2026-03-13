import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Men } from "./pages/Men";
import { Women } from "./pages/Women";
import { Children } from "./pages/Children";
import { Teraz } from "./pages/Teraz";
import { Customize } from "./pages/Customize";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "men", Component: Men },
      { path: "women", Component: Women },
      { path: "children", Component: Children },
      { path: "teraz", Component: Teraz },
      { path: "customize", Component: Customize },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
]);