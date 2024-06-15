import { AllTransactionsType } from "@models/alltransactions";
import { atom } from "jotai";

interface Approve {
    data: AllTransactionsType | null
    open: boolean
}

export const approveAtom = atom<Approve>({
    data: null,
    open: false
})