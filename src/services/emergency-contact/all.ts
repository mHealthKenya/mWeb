import { axiosConfig } from "@config/axios"
import { Contact } from "@models/emergency-contact"
import { useQuery } from "@tanstack/react-query"

const allEmergencyContacts = async () => {
    const axiosInstance = await axiosConfig()

    const contacts = await axiosInstance.get('facilities/emergencycontacts').then((res) => res.data)

    return contacts
}


const useAllEmergencyContacts = (initialData: Contact[]) => useQuery({
    queryKey: ['contacts'],
    queryFn: allEmergencyContacts,
    initialData
})

export default useAllEmergencyContacts