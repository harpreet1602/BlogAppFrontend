// isLoggedIn => is the user logged in.

export const isLoggedIn = ()=>{
    let data = localStorage.getItem("data");
    return data != null? true:false;
}
// doLogIn => set to local storage.
export const doLogIn = (data,next)=>{
    localStorage.setItem("data",JSON.stringify(data));
    next();
}
// doLogOut => remove from local storage.
export const doLogOut = (next)=>{
    localStorage.removeItem("data");
    next();
}
// getCurrentUser => return the token stored
export const getCurrentUser = ()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }
    return undefined;
}

// get token
export const getToken = ()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token;
    }
    return null;
}