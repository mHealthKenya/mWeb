import { axiosConfig } from "@config/axios"
import { Contact } from "@models/emergency-contact"
import { useQuery } from "@tanstack/react-query"

interface RQProps {
    facilityId: string
    contact: Contact | null
}

const facilityEmergencyContact = async (facilityId: string) => {
    const axiosInstance = await axiosConfig()

    const contact: Contact = await axiosInstance.get(`facilities/emergencycontact?facilityId=${facilityId}`).then((res) => res.data)

    return contact
}

const useFacilityEmergencyContact = ({ facilityId, contact }: RQProps) => useQuery({
    queryKey: ['contact', facilityId],
    queryFn: () => facilityEmergencyContact(facilityId),
    initialData: contact
})

export default useFacilityEmergencyContact