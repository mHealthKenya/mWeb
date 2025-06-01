import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"

interface Add {
    facilityId: string
    phone: string
}

const addEmergencyContact = async (data: Add) => {
    const axiosInstance = await axiosConfig()

    const contact = await axiosInstance.post('facilities/emergencycontact', data).then((res) => res.data)

    return contact
}

const useAddEmergencyContact = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addEmergencyContact,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['contacts'])
            Swal.fire({
                title: 'Success!',
                text: 'Contact saved!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },

        onError: async () => {
            Swal.fire({
                title: 'Error!',
                text: 'Could not save contact!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}

export default useAddEmergencyContact