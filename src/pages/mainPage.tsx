import { Outlet } from "react-router-dom";
import Global from "../styles/global";
import Footer from "./footer";

export default function MainPage() {
  return (
    <main>
      <Global />
      <Outlet />
      <Footer />
    </main>
  );
}
