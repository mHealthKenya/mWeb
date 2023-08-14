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



export default useAllSchedules;