import { useParams } from "react-router-dom";

export const NodeDetailsPage = () => {
  const params = useParams();
  const nodePath = params["*"] ?? "";

  return <>{`Route path: /tree/${nodePath}`}</>;
};
