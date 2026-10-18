import {apiDelete, apiGet, apiPost, apiPut} from "./apiManager";
import {apiRoutes} from "../components/constants";

export async function getCsv(id) {
    const data = await apiGet(apiRoutes.getSolutionCsv(id))
    if (data?.data){
        const blob = new Blob([data?.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'solution.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return data?.data
    }
    return data
}

export async function getEmissionCsv(id) {
    const data = await apiGet(apiRoutes.getEmissionCsv(id, "?export_to_csv=true"))
    if (data?.data){
        const blob = new Blob([data?.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'emission.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return data?.data
    }
    return data
}
