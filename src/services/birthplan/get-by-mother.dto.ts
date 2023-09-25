import { axiosConfig, baseURL } from '@config/axios'
import { BirthPlan } from '@models/birthplan'
import { useQuery } from '@tanstack/react-query'

const getBirthPlanByMotherId = async (id: string) => {
  const axiosInstance = await axiosConfig()

  const bPlan = await axiosInstance
    .get(baseURL + 'birthplan/mother?motherId=' + id)
    .then((res) => res.data)

  return bPlan
}

const useBirthPlan = (initialData?: BirthPlan, id?: string) =>
  useQuery({
    queryKey: [`plan${id}`],
    queryFn: () => getBirthPlanByMotherId(id!!),
    initialData,
    enabled: !!id
  })

export default useBirthPlan
