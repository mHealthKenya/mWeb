import { axiosConfig } from "@config/axios"
import { AllTransactionsType } from "@models/alltransactions"
import { useQuery } from "@tanstack/react-query"

const allTransactions = async () => {
    const axiosInstance = await axiosConfig()
    const transactions = await axiosInstance.get(
        "wallet/transactions/all"
    ).then((res) => res.data)

    return transactions

}


const useAllTransactions = (data: AllTransactionsType[]) => {

    return useQuery({
        queryFn: allTransactions,
        queryKey: ['transactions'],
        initialData: data
    })
}


export default useAllTransactions