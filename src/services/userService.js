import { myAxios, privateAxios } from "./helper";

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

export function getUser(userId){
    return myAxios.get(`/users/${userId}`).then(response=>{return response.data});
}

export function updateUser(userId,user){
    return privateAxios.put(`/users/${userId}`,user).then(response=>{return response.data});
}