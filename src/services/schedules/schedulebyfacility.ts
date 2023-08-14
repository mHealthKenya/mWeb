import { axiosConfig } from "@config/axios"
import { useQuery } from "@tanstack/react-query"


const scheduleByFacility = async (facilityId: string) =>{
  const axiosInstance = axiosConfig()

  const updatedSchedule = (await axiosInstance).get('schedules/facility?facilityId='+ facilityId).then((res) => res.data)
    .catch((error) => console.log(error))

  return updatedSchedule
}

const useScheduleByFacility = (data: string) => {
  useQuery({
    queryKey: ['scheduleByFacility', data],
    queryFn: scheduleByFacility,
  })
}

export default useScheduleByFacility