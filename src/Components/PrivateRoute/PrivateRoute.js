import { useNavigate } from "react-router-dom";
import useStore from "../../Store/useStore";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, authLoading } = useStore();

  if (authLoading) return null;
  if (user?.userId) {
    return children;
  } else {
    navigate("/");
  }
};

export default PrivateRoute;
