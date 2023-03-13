import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth";

export const PrivateRoute = ()=>{
    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />
}