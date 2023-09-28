import { axiosConfig } from "@config/axios"
import { Target } from "@models/target"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

export const target = async () => {
    const axiosInstance = axiosConfig()
    const targets = (await axiosInstance).get('targets/chvtarget').then((res) => res.data)
    .catch((error) => console.log(error))

    return targets
}

const useTarget = (data: Target): UseQueryResult<any, unknown> => {
    return useQuery ({
        queryKey : ['allTargets', data],
        queryFn: target
    })
}

export default useTarget