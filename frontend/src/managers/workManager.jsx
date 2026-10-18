import {apiDelete, apiGet, apiPost, apiPut} from "./apiManager";
import {apiRoutes} from "../components/constants";

export async function getWorks(title) {
    const data = await apiGet(apiRoutes.getWork(title))
    const res = []
    if (data?.data){
        return data?.data
    }
    return res
}
export async function deleteWork(id) {
    return await apiDelete(apiRoutes.deleteWork(id))
}

export async function createWork(data) {
    await apiPost(apiRoutes.createWork, data)
}

export async function updateJob(workID, data) {
    await apiPut(apiRoutes.updateWork(workID), data)
}

