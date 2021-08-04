import { Response } from './h';
import useSWR from "swr";

export function useSupaflixApi<T>(key: Array<string>, fetcher: (key: string, secondKey: string) => Promise<Response<T>>): Response<T> {
    let { data, error } = useSWR<Response<T>>(key, fetcher, { revalidateOnFocus: false })
    // console.log('useSupaflixApi', key, data, error)
    if (error) {
        return { isError: true, status: { code: 500, message: String(error) } }
    } else if(!data){
        //todo find a better solution
        return { isError: true, status: { code: 999, message: String(error) } }
    } else if (data.isError && (data.status.code === 401 || data.status.code === 409)) {
        // TODO: add logout
        console.log('need logout')
    }
    // TODO: fix dirty hack
    if (!('isError' in data)) {
        data = { isError: false, value: data }
    }
    return data;
}
