import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../store/AuthenticationContext/AuthenticationContext";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const { authenticationStatus, isAuthenticated } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    async function authStatus() {
      try {
        const response = await authenticationStatus();
        if (response) {
          setLoginStatus(true);
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

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await authenticationStatus();
        if (!response || !isAuthenticated) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    }
    if (loginStatus) {
      checkAuthStatus();
    }
  }, [navigate]);

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
