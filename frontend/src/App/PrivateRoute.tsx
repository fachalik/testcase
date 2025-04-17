import { Navigate } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

const PrivateRoute = ({ isAuthenticated, children }: Props) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
