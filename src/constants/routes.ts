export const ROUTES = {
  HOME: "/",
  TREE: "/tree",
} as const;

export const ROUTE_SEGMENTS = {
  TREE: "tree",
  TREE_DETAILS: "tree/*",
  NOT_FOUND: "*",
} as const;
