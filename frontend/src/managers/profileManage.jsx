import {apiDelete, apiGet, apiPost, apiPut} from "./apiManager";
import {apiRoutes} from "../components/constants";

export async function getVehicleProfile(title) {
    const data = await apiGet(apiRoutes.getVehicleProfiles(title))
    const res = []
    if (data?.data){
        return data?.data
    }
    return res
}
export async function deleteVehicleProfile(id) {
    return await apiDelete(apiRoutes.deleteVehicleProfile(id))
}

export async function createVehicleProfile(data) {
    await apiPost(apiRoutes.createVehicleProfile, data)
}

export async function updateVehicleProfile(id, data) {
    await apiPut(apiRoutes.updateVehicleProfile(id), data)
}
