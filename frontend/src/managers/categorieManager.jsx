import {apiDelete, apiGet, apiPost, apiPut} from "./apiManager";
import {apiRoutes} from "../components/constants";

export async function getCategory(title) {
    const data = await apiGet(apiRoutes.getCategories(title))
    const res = []
    if (data?.data){
        return data?.data
    }
    return res
}
export async function deleteCategory(id) {
    return await apiDelete(apiRoutes.deleteCategory(id))
}

export async function createCategory(data) {
    await apiPost(apiRoutes.createCategory, data)
}

export async function updateCategory(id, data) {
    await apiPut(apiRoutes.updateCategory(id), data)
}

