import { useState } from "react";
import apiService, { Query } from "../services/apiService";
import { HTTP_METHODS } from "../constants/http";
import queryService from "../services/queryService";

type UseQueryArguments<T> = {
    url: string;
    queryParams?: Query;
    httpMethod?: string;
    id?: number;
    mapper?: (data: any) => T;
    onSucess?: (data: T) => void;
}

export default function useQuery<T>({
    url,
    id,
    httpMethod,
    queryParams,
    mapper = (data) => data as T,
    onSucess = () => {},
}: UseQueryArguments<T> ) {

    if(!url) {
        throw new Error('URL is required');
    }

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string[] | null>(null);

    const getDataAsync = async () => {
        setIsLoading(true);
        
        try {
            const response = await apiService.makeRequestAsync<T>({
                url,
                httpMethod: HTTP_METHODS.GET,
                queryParams,
            });

            if('message' in response) {
                setErrors([response.message]);
            } else {
                const mappedData = mapper(response.data);
                setData(mappedData);
                onSucess(mappedData);
            }
        } catch (error) {
            setErrors([error as string]);
        }

        setIsLoading(false);
    };

    const sendAsync = async (values? : Query) => {
        setIsLoading(true);
        const saniziteValues = values ? queryService.sanitize(values) : "";
        const query = id ? { id } : undefined;

        try {
            const response = await apiService.makeRequestAsync<T>({
                url,
                queryParams: query,
                body: saniziteValues,
                httpMethod: httpMethod || HTTP_METHODS.POST,
            });
            if('message' in response) {
                setErrors([response.message]);
            } else {
                onSucess(response.data);
            }
        } catch (error) {
            setErrors([error as string]);
        }

        setIsLoading(false);
    }

    return {
        data,
        isLoading,
        errors,
        getDataAsync,
        sendAsync,
    };
};