import axios from "axios";
import { toast } from 'react-hot-toast';
//
// export async function apiPost(url, data, config={}) {
//     try {
//         await axios.post(url, data, config)
//             .then((response) => {
//                 console.log(response);
//             });
//     } catch (e) {
//
//     }
// }
//
// export async function apiPut(url, data, config={}) {
//     try {
//         await axios.put(url, data, config)
//             .then((response) => {
//                 console.log(response);
//             });
//     } catch (e) {
//
//     }
// }
//
//
// export async function apiGet(url) {
//     try {
//         return await axios.get(url)
//     } catch (e) {
//
//     }
// }
//
//
// export async function apiDelete(url) {
//     try {
//         return await axios.delete(url)
//     } catch (e) {
//
//     }
// }

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": window.CSRF_TOKEN, // 👈 CSRF token for Django
    },
    withCredentials: true, // send cookies with requests
});

export async function apiPost(url, data, config = {}) {
    try {
        return await api.post(url, data, config);
    } catch (e) {
        console.error("POST error:", e.response || e);
        toast.error(e?.response?.data?.error || e.message || e);
        throw e;
    }
}

export async function apiPut(url, data, config = {}) {
    try {
        return await api.put(url, data, config);
    } catch (e) {
        console.error("PUT error:", e.response || e);
        toast.error(e?.response?.data?.error || e.message || e);
        throw e;
    }
}

export async function apiGet(url, config = {}) {
    try {
        return await api.get(url, config);
    } catch (e) {
        console.error("GET error:", e.response || e);
        toast.error(e?.response?.data?.error || e.message || e);
        throw e;
    }
}

export async function apiDelete(url, config = {}) {
    try {
        return await api.delete(url, config);
    } catch (e) {
        console.error("DELETE error:", e.response || e);
        toast.error(e?.response?.data?.error || e.message || e);
        throw e;
    }
}