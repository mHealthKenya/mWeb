import { EnquiryFormProps } from "@components/Chv/Enquiries/Add"
import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"

// interface EnquiryAdd {
//     senderId: string
//     title: string
//     description: string
//     facilityId: string
// }

interface AddEnquiry extends EnquiryFormProps {
    senderId: string
}

const addEnquiry = async (data: AddEnquiry) => {
    const axiosInstance = await axiosConfig()
    const newEnquiry = await axiosInstance.post('enquiries/add', data).then((res) => res.data)

    return newEnquiry
}

const useAddEnquiry = (completeFn: () => void) => {
    const queryClient = useQueryClient()
    return useMutation ({
        mutationFn: addEnquiry,
        onSuccess: async (data) => {
            await Promise.all([queryClient.invalidateQueries([`enquiries${data.facilityId}`])])
            Swal.fire({
              title: 'Success!',
              text: 'Enquiry Successful',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              completeFn()
            })
          },
      
          onError: (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: error?.response?.data?.message || 'An error occurred',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
      }
      
      export default useAddEnquiry