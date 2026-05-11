import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { ROUTE_SEGMENTS } from "../constants/routes";
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
        path: ROUTE_SEGMENTS.TREE,
        element: <TreePage />,
      },
      {
        path: ROUTE_SEGMENTS.TREE_DETAILS,
        element: <NodeDetailsPage />,
      },
      {
        path: ROUTE_SEGMENTS.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
]);
