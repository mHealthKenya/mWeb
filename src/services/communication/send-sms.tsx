import { axiosConfig } from '@config/axios'
import { useMutation } from '@tanstack/react-query'
import Swal from 'sweetalert2'

interface SendSmsProps {
  phoneNumbers: string[]
  message: string
}

const sendSMS = async (data: SendSmsProps) => {
  const axiosInstance = await axiosConfig()

  const request = await axiosInstance.post('communication/send-sms', data).then((res) => res.data)

  return request
}

const useSendSMS = ({ successFn }: { successFn: () => void }) => {
  return useMutation({
    mutationFn: sendSMS,
    async onSuccess() {
      await Swal.fire({
        title: 'Success!',
        text: 'Messages have been sent successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })

      await successFn()
    },

    onError(error: any) {
      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.message || 'Could not send messages',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  })
}

export default useSendSMS
