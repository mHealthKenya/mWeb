import { axiosConfig } from "@config/axios"
import { useQuery } from "@tanstack/react-query"

const allScheduledMessages = async () => {
    const axiosInstance = await axiosConfig()
    try {
        const response = await axiosInstance.get('scheduled-messages')
        return response.data
    } catch (error) {
        console.error("Error fetching scheduled messages:", error)
        throw error // Re-throw the error so React Query can handle it
    }
}

const useAllScheduledMessages = () => {
    return useQuery({
        queryKey: ['scheduled-messages'],
        queryFn: allScheduledMessages, // Fixed the spelling to match the function name
    })
}

export default useAllScheduledMessages