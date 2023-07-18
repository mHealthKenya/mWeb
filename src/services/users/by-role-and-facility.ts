import { axiosConfig } from '@config/axios'

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
