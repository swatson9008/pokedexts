import { Outlet } from "react-router-dom";
import Global from "../styles/global";

export default function MainPage() {
  return (
    <main>
      <Global />
      <Outlet />
    </main>
  );
}
