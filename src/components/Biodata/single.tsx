import CenterComponent from '@components/Shared/Center'
import { UserBioData } from '@models/bio-data'
import { Card, CardContent, CardHeader } from '@mui/material'
import React, { FC } from 'react'
import { Stack } from 'react-bootstrap'

const BiodataComponent: FC<{ bio: UserBioData }> = ({ bio }) => {
  return (
    <CenterComponent>
      <Card>
        <CardHeader title= {bio.user.f_name}/>
        <CardContent>
          <Stack>

          </Stack>
        </CardContent>
      </Card>
    </CenterComponent>
  )
}

export default BiodataComponent 