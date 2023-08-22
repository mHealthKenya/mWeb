import React, { FC, useState } from 'react'
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  CardActions
} from '@mui/material'
import CenterComponent from '@components/Shared/Center'
import { Edit } from '@mui/icons-material'
import { UserByRole } from '@models/user-by-role'
import SharedModal from '@components/Shared/Modal'
import EditBioDataComponent from '@components/Biodata/editBioData'

interface ViewBioDataComponentProps {
  bio: UserByRole | undefined
  handleToggle: () => void
}

const formatDate = (dateString: string | Date) => {
  const date = dateString instanceof Date ? dateString : new Date(dateString)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).format(date)

  return formattedDate
}

const ViewBioDataComponent: FC<ViewBioDataComponentProps> = ({ bio, handleToggle }) => {
  const [open, setOpen] = useState(false)

  const [user, setUser] = useState<UserByRole | undefined>()
  // const [user, setUser] = useState<UserByRole>()

  const handleEdit = (user: UserByRole) => {
    setOpen(true)
    setUser(user)
  }

  return (
    <CenterComponent>
      <Card sx={{ minWidth: 700 }}>
        <CardHeader title={`${bio?.f_name} - Bio Data`} />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Height:</TableCell>
                  <TableCell>{bio?.BioData[0].height}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weight:</TableCell>
                  <TableCell>{bio?.BioData[0].weight}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Age:</TableCell>
                  <TableCell>{bio?.BioData[0].age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Monthly Period:</TableCell>
                  <TableCell>{formatDate(bio!.BioData[0].last_monthly_period)} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expected Delivery Date:</TableCell>
                  <TableCell>{formatDate(bio!.BioData[0].expected_delivery_date)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pregnancy Period:</TableCell>
                  <TableCell>{bio?.BioData[0].pregnancy_period}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Clinic Visit:</TableCell>
                  <TableCell>{formatDate(bio!.BioData[0].last_clinic_visit)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Previous Pregancies:</TableCell>
                  <TableCell>{bio?.BioData[0].previous_pregnancies}</TableCell>
                </TableRow>
                {/* Add more rows for other fields */}
              </TableBody>
            </Table>
          </TableContainer>
          <CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                color="info"
                startIcon={<Edit />}
                size="small"
                onClick={() => {
                  handleEdit(bio!)
                }}>
                Edit
              </Button>

              <Button variant="contained" color="error" size="small" onClick={handleToggle}>
                Close
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
        <EditBioDataComponent bioDataUpdate={user!} handleToggle={handleToggle} />
      </SharedModal>
    </CenterComponent>
  )
}

export default ViewBioDataComponent
