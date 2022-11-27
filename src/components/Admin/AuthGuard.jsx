import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { isLogged, user } = useSelector((state) => state.auth);
  if (isLogged && user?.roles.some((x) => x === "admin")) return children;
  else return <Navigate to={"/"} replace />;
};

export default AuthGuard;
