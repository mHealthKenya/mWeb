import { axiosConfig } from '@config/axios'
import { useQuery } from '@tanstack/react-query'

export interface RoleAndFacility {
  role: string
  facilityId?: string
}
export const getUsersByRoleAndFacility = async (data: RoleAndFacility) => {
  const axiosInstance = await axiosConfig()

  const response = await axiosInstance
    .get('users/roleandfacility?facilityId=' + data.facilityId + '&role=' + data.role)
    .then((res) => res.data)

  return response
}

const useUsersByRoleAndFacility = (data: RoleAndFacility) =>
  useQuery({
    queryFn: () => getUsersByRoleAndFacility(data),
    queryKey: ['RoleAndFacility' + data.facilityId + data.role]
  })

export default useUsersByRoleAndFacility