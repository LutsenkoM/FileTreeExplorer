import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { AboutPage } from "../pages/AboutPage";
import { HomePage } from "../pages/HomePage";
import { NodeDetailsPage } from "../pages/NodeDetailsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { TreePage } from "../pages/TreePage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "tree",
        element: <TreePage />,
      },
      {
        path: "tree/*",
        element: <NodeDetailsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
