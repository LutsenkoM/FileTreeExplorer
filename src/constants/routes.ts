export const ROUTES = {
  HOME: "/",
  TREE: "/tree",
  ABOUT: "/about",
} as const;

export const ROUTE_SEGMENTS = {
  TREE: "tree",
  TREE_DETAILS: "tree/*",
  ABOUT: "about",
  NOT_FOUND: "*",
} as const;
