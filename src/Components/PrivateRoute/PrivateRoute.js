import { useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, userLoading } = useStore();

  if (userLoading) return null;

  if (!user?.userId) {
    navigate("/");
  } else {
    return children;
  }
};

export default PrivateRoute;
