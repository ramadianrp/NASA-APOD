import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainLayout;
