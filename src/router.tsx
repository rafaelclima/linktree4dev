import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./assets/pages/Admin";
import { AdminRootLayout } from "./assets/pages/AdminRootLayout";
import { Home } from "./assets/pages/Home";
import { Login } from "./assets/pages/Login";
import { Social } from "./assets/pages/Social";

import { Private } from "./routes/Private";
import NotFound from "./assets/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <AdminRootLayout />,
    children: [
      {
        index: true,
        element: (
          <Private>
            <Admin />
          </Private>
        ),
      },
      {
        path: "/admin/social",
        element: (
          <Private>
            <Social />
          </Private>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
