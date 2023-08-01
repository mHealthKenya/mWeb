<<<<<<< HEAD
import { axiosConfig } from '@config/axios'
import { UserByRole } from '@models/user-by-role'
import { useQuery } from '@tanstack/react-query'

export const getUsersByRole = async (role: string) => {
  const axiosInstance = await axiosConfig()
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
=======
import { axiosConfig } from '@config/axios'
import { UserByRole } from '@models/user-by-role'
import { useQuery } from '@tanstack/react-query'

export const getUsersByRole = async (role: string) => {
  const axiosInstance = await axiosConfig()
  const users: UserByRole[] = await axiosInstance
    .get('users/roles?role=' + role)
    .then((res) => res.data)

  return users
}

const useUsersByRole = (role: string, initialData: UserByRole[]) =>
  useQuery({
    queryKey: ['users-by-role', role],
    queryFn: () => getUsersByRole(role),
    enabled: !!role,
    initialData
  })

export default useUsersByRole
>>>>>>> origin/main
