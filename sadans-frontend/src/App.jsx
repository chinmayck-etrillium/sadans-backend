import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GetTransactionDetails from "./components/GetTransactionDetails/GetTransactionDetails";
import NewTransaction from "./components/NewTransaction/NewTransaction";
import GetClientNameContextProvider from "./store/GetClientNameContext/GetClientNameContext";
import AddNewClient from "./components/AddNewClient/AddNewClient";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="get-transaction"
            element={
              <GetClientNameContextProvider>
                <GetTransactionDetails />
              </GetClientNameContextProvider>
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
          <Route path="add-client" element={<AddNewClient />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
