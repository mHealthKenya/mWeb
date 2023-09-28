import { axiosConfig } from "@config/axios"
import { ChvMothers } from "@models/chvmothers"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

export const allChvMothers = async () => {
    const axiosInstance = axiosConfig()
    const chvmothers = (await axiosInstance).get('users/chvmothers').then((res) => res.data)
    .catch((error) => console.log(error))

    return chvmothers
}

const useAllChvMothers = (data: ChvMothers): UseQueryResult<any, unknown> => {
    return useQuery ({
        queryKey : ['chvmothers', data],
        queryFn: allChvMothers
    })
}

export default useAllChvMothers