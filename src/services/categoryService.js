import { myAxios } from "./helper"

export const loadAllCategories = () => {
    return myAxios.get("/categories/").then(response=>{return response.data});
}

export const loadCategoryById = (categoryId) => {
    return myAxios.get(`/categories/${categoryId}`).then(response=>{return response.data});
}

