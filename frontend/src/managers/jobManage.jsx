import {apiRoutes} from "../components/constants";
import {apiDelete, apiGet, apiPost, apiPut} from "./apiManager";

export async function createJob(data) {
    await apiPost(apiRoutes.postJob, data)
}

export async function updateJob(jobId, data) {
    await apiPut(apiRoutes.updateJob(jobId), data)
}

export async function createBulkJob(data, config={}) {
    await apiPost(apiRoutes.postBulkJob, data, config)
}

export async function createMultiJob(data) {
    await apiPost(apiRoutes.postMultiJob, data)
}

export async function getWork(title) {
    const data = await apiGet(apiRoutes.getSearchWork(title))
    const res = []
    if (data?.data){
        for (let work of data?.data){
            res.push({value:work?.id, label:work?.name})
        }
    }
    return res
}
export async function getJob(title, limit=10, offset=0) {
    const data = await apiGet(apiRoutes.getJobs(title))
    const res = []
    if (data?.data){
        return data?.data
    }
    return res
}


export async function deleteJob(id) {
    await apiDelete(apiRoutes.deleteJob(id))
}
