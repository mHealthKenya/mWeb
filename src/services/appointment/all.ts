import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { axiosConfig } from '@config/axios'
import { Appointments } from '@models/appointments'

export const allAppointments = async () => {
  const axiosInstance = axiosConfig()
  const appointments = (await axiosInstance)
    .get('schedules/appointments')
    .then((res) => res.data)
    .catch((error) => console.log(error))

  return appointments
}

const useAppointments = (data: Appointments): UseQueryResult<any, unknown> => {
  return useQuery({
    queryKey: ['appoitments', data],
    queryFn: allAppointments
  })
}

export default useAppointments
