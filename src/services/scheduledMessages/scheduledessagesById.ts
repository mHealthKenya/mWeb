import { axiosConfig } from "@config/axios";
import { useQuery } from "@tanstack/react-query";

const getScheduledMessageById = async (id: string) => {
    const axiosInstance = await axiosConfig();
    const scheduledMessage = await axiosInstance.get(`scheduled-messages/${id}`).then((res) => res.data);
    return scheduledMessage;
}

const useScheduledMessageById = (id: string) => {
    return useQuery({
        queryKey: ['scheduled-message', id],
        queryFn: () => getScheduledMessageById(id),
        enabled: !!id,
    });
}

export default useScheduledMessageById;