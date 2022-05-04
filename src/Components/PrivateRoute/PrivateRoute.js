import { useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, userLoading } = useStore();

  if (user?.id) return children;
  if (userLoading) return null;
  if (!user?.id) navigate("/");
};

export default PrivateRoute;
