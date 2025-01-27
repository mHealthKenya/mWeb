import { axiosConfig } from "@config/axios"
import { Admission } from "@models/admission"
import { useQuery } from "@tanstack/react-query"



export enum AdmissionStatus {
    Admitted = 'Admitted',
    Discharged = 'Discharged',
    Rejected = 'Rejected',
    Processing = 'Processing'
}

const allAdmissions = async (status: string) => {
    const axiosInstance = await axiosConfig()
    const admissions: Admission[] = await axiosInstance.get(`admissions?status=${status}`).then((res) => res.data)

    return admissions
}

const useAdmissions = ({ admissions, status }: { admissions: Admission[], status: string }) => useQuery({

    queryKey: ['admissions', { status }],
    queryFn: () => allAdmissions(status),
    initialData: admissions,
    enabled: !!status
})

export default useAdmissions