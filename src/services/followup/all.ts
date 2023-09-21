import { axiosConfig } from "@config/axios"
import { FollowUp } from "@models/followup"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

export const allFollowUps = async () => {
    const axiosInstance = axiosConfig()
    const followups = (await axiosInstance).get('followup/all').then((res) => res.data)
    .catch((error) => console.log(error))

    return followups
}

const useAllFollowUp = (data: FollowUp): UseQueryResult<any, unknown> => {
    return useQuery ({
        queryKey : ['allFollowUps', data],
        queryFn: allFollowUps
    })
}

export default useAllFollowUp