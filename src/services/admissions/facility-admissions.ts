import { axiosConfig } from "@config/axios"
import { Admission } from "@models/admission"
import { useQuery } from "@tanstack/react-query"



export enum AdmissionStatus {
    Admitted = 'Admitted',
    Discharged = 'Discharged',
    Rejected = 'Rejected',
    Processing = 'Processing'
}

const facilityAdmissions = async (status: string) => {
    const axiosInstance = await axiosConfig()
    const admissions: Admission[] = await axiosInstance.get(`admissions/facility?status=${status}`).then((res) => res.data)

    return admissions
}

const useFacilityAdmissions = ({ admissions, status }: { admissions: Admission[], status: string }) => useQuery({

    queryKey: ['admissions', { status }],
    queryFn: () => facilityAdmissions(status),
    initialData: admissions,
    enabled: !!status
})

export default useFacilityAdmissions