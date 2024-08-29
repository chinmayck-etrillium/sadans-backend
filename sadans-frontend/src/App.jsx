import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GetTransactionDetails from "./components/GetTransactionDetails/GetTransactionDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="get-transaction" element={<GetTransactionDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
