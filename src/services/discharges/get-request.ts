import { axiosConfig } from "@config/axios"
import { DischargeRequest } from "@models/discharge-request"
import { useQuery } from "@tanstack/react-query"

interface Discharge {
    discharge: DischargeRequest
}

const requestDischarge = async ({ id }: { id: string }) => {
    const axiosInstance = await axiosConfig(true)

    const request: DischargeRequest = await axiosInstance.get(`discharge/request?id=${id}`).then((res) => res.data)

    return request
}

const useDischargeRequest = ({ discharge }: Discharge) => useQuery({
    queryKey: ['admissions', { id: discharge.id }],
    queryFn: () => requestDischarge({ id: discharge.id }),
    initialData: discharge

})

export default useDischargeRequest