import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticationContext = createContext({
  isAuthenticated: "",
  authenticate: () => {},
  authenticationStatus: () => {},
});

export default function AuthenticationContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function authenticate(username, password) {
    const user = {
      username,
      password,
    };
    const url = `http://localhost:3004/api/v1/auth/login`;

    try {
      const response = await axios.post(url, user, { withCredentials: true });

      return response.data;
    } catch (error) {
      return { message: "Error" };
    }
  }

  async function authenticationStatus() {
    const url = "http://localhost:3004/api/v1/auth/";
    try {
      const response = await axios.get(url, { withCredentials: true });
      console.log("Response:", response);
      if (response.data) {
        setIsAuthenticated(true);
      }
      return response.data;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, authenticate, authenticationStatus }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
