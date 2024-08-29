import { Outlet, Link } from "react-router-dom";
import Home from "../Home/Home";
import Header from "../Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
