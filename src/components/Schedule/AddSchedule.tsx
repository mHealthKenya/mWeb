import { UserByRole } from '@models/user-by-role'
import React, { FC } from 'react'

const AddSchedule1: FC<{mothers: UserByRole[], facilityID: string}> = ({mothers, facilityID}) => {
  
  return (
    <>
    <div>{JSON.stringify(mothers)}</div>
    <div>{JSON.stringify(facilityID)}</div>
    </>
  )
}

export default AddSchedule1