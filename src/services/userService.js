import { myAxios } from "./helper";

export const signUp = (user) => {
    return myAxios.post("/auth/register",user).then((response)=>{
        return response.data;   
    });
}

export const login = (user) => {
    return myAxios.post("/auth/login",user).then((response)=>{
        return response.data;
    });
}