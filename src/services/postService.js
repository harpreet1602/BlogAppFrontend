import { myAxios, privateAxios } from "./helper"

export const createPost = (postData)=>{
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=>{return response.data});
}

export const getAllPosts = (pageNumber,pageSize)=>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response=>{return response.data});
}

export const loadPostByPostId = (postId)=>{
    return myAxios.get(`/posts/${postId}`).then(response=>{return response.data});
}

export const loadPostByCategoryId = (categoryId)=>{
    return myAxios.get(`/category/${categoryId}/posts`).then(response=>{return response.data});
}

export const createComment = (postId,userId,commentData)=>{
    return privateAxios.post(`/post/${postId}/user/${userId}/comments`,commentData).then(response=>{return response.data});
}

export const uploadPostImage = (postId,image) => {
    let formdata = new FormData();
    formdata.append("image",image);

    return privateAxios.post(`/post/image/upload/${postId}`,formdata).then(response => {return response.data});
}