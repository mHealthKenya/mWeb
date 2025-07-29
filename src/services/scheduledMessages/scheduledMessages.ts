
import { axiosConfig } from "@config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const addScheduledMessage = async (message: any) => {
    const axiosInstance = await axiosConfig();
    const newScheduledMessage = await axiosInstance.post('scheduled-messages', message).then((res) => res.data);
    return newScheduledMessage;
}

const useAddScheduledMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addScheduledMessage,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['scheduled-messages']);
            Swal.fire({
                title: 'Success!',
                text: 'Message scheduled successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },
        onError: (error: any) => {
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message || 'An error occurred',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

export default useAddScheduledMessage;