import CenterComponent from '@components/Shared/Center'
import { UserByRole } from '@models/user-by-role'
import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import React, { FC } from 'react'
import { Card, TabContainer, Table } from 'react-bootstrap'

export const ViewBirthPlanComponent: FC<{
  handleToggle: () => void
  birthPlan: UserByRole | undefined
}> = ({ handleToggle, birthPlan }) => {
  return (
    <CenterComponent>
      <Card>
        <CardHeader title={`${birthPlan?.f_name} - Birth Plan`} />
        <CardContent>
          <TabContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
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
          </TabContainer>
          <CardActionArea>
            <CardActions>
              <Button variant="contained" color="error" size="small" onClick={handleToggle}>
                close
              </Button>
            </CardActions>
          </CardActionArea>
        </CardContent>
      </Card>
    </CenterComponent>
  )
}
