import { useContext } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";

export const ProfileInfo = ()=>{
    let user = useContext(userContext);
    return (
    <Base>
        <h1>Profile Info</h1>
        <h3>Name is: {user?.name}</h3>
    </Base>
    );
}