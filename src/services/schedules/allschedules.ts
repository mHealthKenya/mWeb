import { axiosConfig } from "@config/axios"
import { Schedule } from "@models/schedule"
import { useQuery, UseQueryResult } from "@tanstack/react-query"


export const allSchedules = async () =>{
  const axiosInstance = axiosConfig()
  const schedules = (await axiosInstance).get('schedules/all').then((res) => res.data)
  .catch((error) => console.log(error))

  return schedules
}


const useAllSchedules = (data: Schedule): UseQueryResult<any, unknown> => {
  return useQuery({
    queryKey: ['allSchedules', data],
    queryFn: allSchedules,
  });
};

export const formatDateTime = (dateString: string): string  => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = date.getFullYear();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

  return `${formattedTime} ${formattedDate}`;
}

const inputDate = '2023-08-01T16:23:00.000Z';
const formatted = formatDateTime(inputDate);
console.log(formatted); // Output: "16:23 01-08-2023"


export default useAllSchedules;