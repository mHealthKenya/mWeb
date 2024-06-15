import { axiosConfig } from "@config/axios"
import { BillVisit } from "@models/billvisit"
import { useQuery } from "@tanstack/react-query"

const getFacilityBills = async () => {
    const axiosInstance = await axiosConfig()
    const bills = await axiosInstance.get(
        "clinicvisit/unbilled"
    ).then((res) => res.data)

    return bills

}

const useFacilityBills = (facilityId: string, data: BillVisit[]) => {
    return useQuery({
        queryFn: getFacilityBills,
        queryKey: ['bills', { facilityId }],
        initialData: data
    })
}


export default useFacilityBills
