import CenterComponent from '@components/Shared/Center'
import SharedModal from '@components/Shared/Modal'
import { UserByRole } from '@models/user-by-role'
import { Update } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React, { FC, useState } from 'react'
import { UpdateBirthPlanComponent } from './editBirthPlan'

export const ViewBirthPlanComponent: FC<{
  handleToggle: () => void
  birthPlan: UserByRole | undefined
}> = ({ handleToggle, birthPlan }) => {
  const [open, setOpen] = useState(false)

  const [user, setUser] = useState<UserByRole | undefined>()

  const handleUpdate = (user: UserByRole) => {
    setOpen(true)
    setUser(user)
  }

  return (
    <CenterComponent>
      <Card sx={{ minWidth: 700 }}>
        <CardHeader title={`${birthPlan?.f_name} - Birth Plan`} />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Field</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Alternative Facility</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].alternative_facility_id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Delivery Mode</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].delivery_mode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Support Person Name</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].support_person_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Support Person Phone</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].support_person_phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Preferred Transport</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].preferred_transport}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Preferred Attendant Name</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].preferred_attendant_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Preferreed Attendant Phone</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].preferred_attendant_phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Blood Donor Name</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].blood_donor_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Blood Donor Phone</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].blood_donor_phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Emergency Decision Maker Phone</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].emergency_decision_maker_phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Emergency Decison Maker Name</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].emergency_decision_maker_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Delivery Bag</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].delivery_bag}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Emergency CS Plan</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].emergency_cs_plan}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Savings Plan</TableCell>
                  <TableCell>{birthPlan?.BirthPlan[0].savings_plan}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                color="info"
                startIcon={<Update />}
                size="small"
                onClick={() => {
                  handleUpdate(birthPlan!)
                }}>
                Update
              </Button>

              <Button variant="contained" color="error" size="small" onClick={handleToggle}>
                close
              </Button>
            </CardActions>
          </CardActionArea>
        </CardContent>
      </Card>

      <SharedModal
        items={{
          open,
          handleToggle
        }}>
        <UpdateBirthPlanComponent handleToggle={handleToggle} birthPlanUpdate={user!}/>
      </SharedModal>
    </CenterComponent>
  )
}
