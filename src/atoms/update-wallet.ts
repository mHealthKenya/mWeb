import { UserWallet } from "@models/userwallet";
import { atom } from "jotai";

interface UpdateWallet {
    open: boolean
    wallet: UserWallet | null
}

const updateWalletAtom = atom<UpdateWallet>({
    open: false,
    wallet: null
})

export default updateWalletAtom