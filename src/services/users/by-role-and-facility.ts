import { axiosConfig } from '@config/axios'
import { UserByRole } from '@models/user-by-role'
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

const useUsersByRoleAndFacility = (roleAndFacility: RoleAndFacility, initialData: UserByRole[]) =>
  useQuery({
    queryKey: ['users-by-role-and-facility'],
    queryFn: () => getUsersByRoleAndFacility(roleAndFacility),
    enabled: !!roleAndFacility,
    initialData
  })

export default useUsersByRoleAndFacility
