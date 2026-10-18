import { useEffect, useState } from "react";
import {apiGet} from "../managers/apiManager";

function useDataFetch(url, config={}) {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await apiGet(url, config);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, [url]);

    const refetch = () => {
        fetchData().then();
    };

    return { data, error, isLoading, refetch };
}

export default useDataFetch;
