import { useQuery } from '@tanstack/react-query';
import { axiosConfig } from "@config/axios"

export const getBiodata = async (id: string) => {
    const  axiosInstance = await axiosConfig()
    const bio = await axiosInstance
    .get('biodata/id?motherId=' + id)
    .then((res) => res.data)

    return bio
}

const useBiodata = (id: string) => 
useQuery ({
    queryFn: () => getBiodata('' + id),
    queryKey: ['user-by-id', id],
    enabled: !!id,
})

export default useBiodata