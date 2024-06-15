import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/ui/tabs'
import UserWallets from '../user/user-wallets'
import { FC } from 'react'
import { UserWallet } from '@models/userwallet'
import { FacilityWallet } from '@models/facilitywallets'
import AllFacilityWallets from '../facility/all-wallets'

const AllWallets: FC<{ wallets: UserWallet[]; allFacilityWallets: FacilityWallet[] }> = ({
  wallets,
  allFacilityWallets
}) => {
  return (
    <Tabs defaultValue="user" className="w-full">
      <TabsList>
        <TabsTrigger value="user">Mothers</TabsTrigger>
        <TabsTrigger value="facility">Facilities</TabsTrigger>
      </TabsList>
      <TabsContent value="user">
        <UserWallets wallets={wallets} />
      </TabsContent>
      <TabsContent value="facility">
        <AllFacilityWallets allFacilityWallets={allFacilityWallets} />
      </TabsContent>
    </Tabs>
  )
}

export default AllWallets
