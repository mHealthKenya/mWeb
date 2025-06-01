import { Success } from "@services/bills/checkperiodpoints"
import { atom } from "jotai"

export interface CheckBalance {
    open: boolean
    data: Success
}


const checkBalanceAtom = atom<CheckBalance>({
    open: false,
    data: {
        totalBalance: null
    },
})

export default checkBalanceAtom