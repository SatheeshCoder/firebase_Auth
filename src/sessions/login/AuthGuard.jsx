import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
const AuthGuard = ({ children }) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  let authenticated = isAuthenticated;
  console.log("pathname",pathname === "/session/signin");
  

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
