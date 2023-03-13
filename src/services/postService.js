import { myAxios, privateAxios } from "./helper"

export const createPost = (postData)=>{
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=>{return response.data});
}

export const getAllPosts = (pageNumber,pageSize)=>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response=>{return response.data});
}