import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/ui/tabs'
import UserWallets from '../user/user-wallets'
import { FC } from 'react'
import { UserWallet } from '@models/userwallet'
import { FacilityWallet } from '@models/facilitywallets'
import AllFacilityWallets from '../facility/all-wallets'
import { MothersBalances } from '../user/balances'
import { Facility } from '@models/facility'
import { MotherBalances } from '@models/mother-balances'

const AllWallets: FC<{
  wallets: UserWallet[]
  allFacilityWallets: FacilityWallet[]
  facilities: Facility[]
  balances: MotherBalances[]
}> = ({ wallets, allFacilityWallets, facilities, balances }) => {
  return (
    <Tabs defaultValue="user" className="w-full">
      <TabsList>
        <TabsTrigger value="user">Mothers</TabsTrigger>
        <TabsTrigger value="facility">Facilities</TabsTrigger>
        <TabsTrigger value="balances">Balances</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <UserWallets wallets={wallets} />
      </TabsContent>
      <TabsContent value="facility">
        <AllFacilityWallets allFacilityWallets={allFacilityWallets} />
      </TabsContent>
      <TabsContent value="balances">
        <MothersBalances facilities={facilities} balances={balances} />
      </TabsContent>
    </Tabs>
  )
}

export default AllWallets
