import { Outlet } from "react-router-dom";

export default function MainPage(){

    return (
        <main>
            <div><Outlet /></div>
        </main>

    )
}