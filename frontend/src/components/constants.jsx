
let apiBaseUrl = ""

if (import.meta.env.MODE === "development") {
    apiBaseUrl = import.meta.env.VITE_PUBLIC_API_BASE
}



const addQueryParams = (route) => (queryParams = {limit: 10, offset: 0}) => {
    let modifiedUrl = route;
    if (route.slice(-1) === '/') {
        modifiedUrl = route.slice(0, -1)
    }
    const queryString = `/?${Object.entries(queryParams).map(([key, value]) => `&${key}=${value}`).join('')}`;
    return `${modifiedUrl}${queryString}`;
};
export const JOBS = [
    {
        path: '',
        name: "Dashboard"
    },
    {
        path: 'work',
        name: "Work"
    },
    {
        path: 'job-category',
        name: "JobCategory"
    },
    {
        path: 'job',
        name: "Job"
    },
    {
        path: 'vehicle-profile',
        name: "VehicleProfile"
    },
    {
        path: 'fleet',
        name: "Fleet"
    },
]

export const apiRoutes = {
    postJob: `${apiBaseUrl}/job-create/`,
    createCategory: `${apiBaseUrl}/category_create/`,
    updateJob:(jobID)=> `${apiBaseUrl}/job-update/${jobID}/`,
    updateCategory:(id)=> `${apiBaseUrl}/category_update/${id}/`,
    updateWork:(workID)=> `${apiBaseUrl}/work-update/${workID}/`,
    postBulkJob: `${apiBaseUrl}/job-create-bulk/`,
    postBulkFleet: `${apiBaseUrl}/fleet-create-bulk/`,
    deleteJob: (id)=>`${apiBaseUrl}/job-delete/${id}/`,
    postMultiJob: `${apiBaseUrl}/multijob-create/`,
    getWork:addQueryParams(`${apiBaseUrl}/works/`),
    getLastSolution:`${apiBaseUrl}/last_solution/`,
    getSolutionCsv: (Id) =>`${apiBaseUrl}/export_solution_csv/${Id}/`,
    getEmissionCsv: (Id, extra="") =>`${apiBaseUrl}/emission_report/${Id}/${extra}`,
    getCategories:addQueryParams(`${apiBaseUrl}/categories/`),
    getSearchWork:(title)=>`${apiBaseUrl}/search-works/?name=${title}`,
    createWork: `${apiBaseUrl}/work-create/`,
    deleteWork:(id)=> `${apiBaseUrl}/work_delete/${id}/`,
    deleteCategory:(id)=> `${apiBaseUrl}/category_delete/${id}/`,
    getJobs: addQueryParams(`${apiBaseUrl}/jobs/`),
    getSolution:(id='')=> `${apiBaseUrl}/solve/${id}`,
    getVehicles: addQueryParams(`${apiBaseUrl}/vehicles/`),
    updateVehicle: (id)=>`${apiBaseUrl}/update-vehicle/${id}/`,
    getVehicleProfiles: addQueryParams(`${apiBaseUrl}/vehicle-profiles/`),
    searchVehicleProfiles: (title)=>(`${apiBaseUrl}/vehicle-profiles-search/`),
    createVehicleProfile: `${apiBaseUrl}/vehicle-profile-create/`,
    updateVehicleProfile: (id)=> `${apiBaseUrl}/vehicle-profile-update/${id}/`,
    deleteVehicleProfile:(id)=> `${apiBaseUrl}/vehicle-profile-delete/${id}/`,
    deleteVehicle:(id)=> `${apiBaseUrl}/vehicle-delete/${id}/`,
    createVehicle:`${apiBaseUrl}/vehicle-create/`,
}

export const colorPalette = ["#003f5c",
    "#58508d",
    "#bc5090",
    "#ff6361",
   "#ffa600"]