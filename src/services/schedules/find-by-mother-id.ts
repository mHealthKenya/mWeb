import { axiosConfig } from '@config/axios'
import { UserSchedule } from '@models/schedules'
import { useQuery } from '@tanstack/react-query'

const findSchedulesByMotherId = async (motherId: string) => {
  const axiosInstance = await axiosConfig()

  const schedules = await axiosInstance
    .get('schedules/mother?motherId=' + motherId)
    .then((res) => res.data)

  return schedules
}

const useFindSchedulesByMotherId = (initialData?: UserSchedule[], id?: string) =>
  useQuery({
    queryKey: [`schedules${id}`],
    queryFn: () => findSchedulesByMotherId(id!!),
    initialData,
    enabled: !!id
  })

export default useFindSchedulesByMotherId
