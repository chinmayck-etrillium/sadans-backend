import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GetTransactionDetails from "./components/GetTransactionDetails/GetTransactionDetails";
import NewTransaction from "./components/NewTransaction/NewTransaction";
import GetClientNameContextProvider from "./store/GetClientNameContext/GetClientNameContext";
import AddNewClient from "./components/AddNewClient/AddNewClient";
import DeleteTransaction from "./components/DeleteTransaction/DeleteTransaction";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GetLastNTransactionContextProvider from "./store/GetLastNTransactionContext/GetLastNTransactionContext";
import GetClientIdFromNameContextProvider from "./store/GetClientIdFromNameContext/GetClientIdFromNameContext";
import AuthenticationContextProvider from "./store/AuthenticationContext/AuthenticationContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthenticationContextProvider>
              <Login />
            </AuthenticationContextProvider>
          }
        />

        <Route
          path="/"
          element={
            <AuthenticationContextProvider>
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            </AuthenticationContextProvider>
          }
        >
          <Route
            index
            element={
              <AuthenticationContextProvider>
                <Home />
              </AuthenticationContextProvider>
            }
          />
          <Route
            path="get-transaction"
            element={
              <GetLastNTransactionContextProvider>
                <GetClientIdFromNameContextProvider>
                  <GetClientNameContextProvider>
                    <GetTransactionDetails />
                  </GetClientNameContextProvider>
                </GetClientIdFromNameContextProvider>
              </GetLastNTransactionContextProvider>
            }
          />
          <Route
            path="new-transaction"
            element={
              <GetClientNameContextProvider>
                <NewTransaction />
              </GetClientNameContextProvider>
            }
          />
          <Route path="add-client" element={<AddNewClient />} />
          <Route path="delete-transaction" element={<DeleteTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
