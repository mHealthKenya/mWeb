import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { axiosConfig } from "@config/axios";

const deleteScheduledMessage = async (id: string) => {
  const axiosInstance = await axiosConfig();
  await axiosInstance.delete(`scheduled-messages/${id}`);
  return id;
};

export function useDeleteScheduledMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScheduledMessage,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["scheduled-messages"]);
      Swal.fire({
        title: "Deleted!",
        text: "The scheduled message was successfully deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to delete the message.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });
}
