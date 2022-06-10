import { useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, userLoading, authLoading } = useStore();

  if (user?.userId) return children;
  if (userLoading || authLoading) return null;
  if (!user?.userId) navigate("/");
};

export default PrivateRoute;
