import { UserByRole } from '@models/user-by-role'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'

export const getUsersByRole = async (role: string) => {
  const users: UserByRole[] = await axiosInstance
    .get('users/roles?role=' + role)
    .then((res) => res.data)

  return users
}

const useUsersByRole = (role: string, initialData: UserByRole[]) =>
  useQuery({
    queryKey: ['users-by-role'],
    queryFn: () => getUsersByRole(role),
    enabled: !!role,
    initialData
  })

export default useUsersByRole
