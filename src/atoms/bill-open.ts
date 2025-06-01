import { BillVisit } from '@models/billvisit'
import { atom } from 'jotai'
const billOpenAtom = atom(false)


export const billAtom = atom<BillVisit | undefined>(undefined)

export default billOpenAtom