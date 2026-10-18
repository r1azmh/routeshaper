import {apiRoutes} from "../components/constants";
import {apiDelete, apiGet, apiPost} from "./apiManager";

export async function getWork(title) {
    const data = await apiGet(apiRoutes.getWork(title))
    const res = []
    if (data?.data){
        return data?.data
    }
    return res
}
export async function getSolution(id) {
    const data = await apiGet(apiRoutes.getSolution(id))
    const res = {}
    console.log(data)
    if (data?.data){
        return data?.data
    }
    return res
}


