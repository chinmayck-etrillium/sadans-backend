import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../store/AuthenticationContext/AuthenticationContext";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { authenticationStatus, isAuthenticated } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    async function authStatus() {
      try {
        const response = await authenticationStatus();
        console.log("Inside effect", response);
        if (response) {
          console.log("Hi");
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    }

    authStatus();
  }, []);

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
