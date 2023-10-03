import { axiosConfig } from "@config/axios"
import { FollowUp } from "@models/followup"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

export const allAppointments = async () => {
    const axiosInstance = axiosConfig()
    const appointments = (await axiosInstance).get('schedules/appointments').then((res) => res.data)
    .catch((error) => console.log(error))

    return appointments
}

const useAllAppointments = (data: FollowUp): UseQueryResult<any, unknown> => {
    return useQuery ({
        queryKey : ['followUps', data],
        queryFn: allAppointments
    })
}

export default useAllAppointments