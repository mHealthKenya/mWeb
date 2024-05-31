import { Box, Button, CardActions, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react'
import WalletRecordComponent from './add'
import { Wallet } from '@mui/icons-material'
import Center from '@components/Shared/CenterVert'
import SharedModal from '@components/Shared/Modal'
import {
  Col,
  colsWithFacilityCol,
  colsWithOutFacilityCol,
  rowsWithFacility,
  rowsWithoutFacility
} from 'src/data/users-by-role'
import AdminManageWalletComponent from './managewallet'
import { WalletStatusComponent } from './walletstatus'
import { UserByRole } from '@models/user-by-role'

// export interface ChvMothersData {
//   chvmothers: ChvMothers
// }

export const FacilityWalletColumn: Col[] = [
  {
    field: 'name',
    headerName: 'Name'
  },
  {
    field: 'email',
    headerName: 'Email'
  },
  {
    field: 'phone',
    headerName: 'Phone'
  },
  {
    field: 'national_id',
    headerName: 'National ID'
  },
  {
    field: 'facility',
    headerName: 'Facility'
  },
  {
    field: 'action',
    headerName: 'Action'
  }
]

const ManageWalletComponent: React.FC<{
  users: UserByRole[]
  facility?: boolean
  isFacility?: boolean
  sadmin?: boolean
  visit?: boolean
  // data: any
}> = ({ facility, isFacility }) => {
  const [open, setOpen] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [walletStatus, setWalletStatus] = useState(false)
  const [user, setUser] = useState<UserByRole>()
  // const [value, setValue] = React.useState(0)

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const toggleViewWalletStatus = () => {
    setWalletStatus((walletStatus) => !walletStatus)
  }

  const sampleData = [
    {
      id: 1,
      name: 'Alice Waithira',
      gender: 'Female',
      email: 'alice@example.com',
      phone_number: '254798883776',
      national_id: '33766637',
      facility: 'Ruaraka Neema Uhai'
    },
    {
      id: 2,
      name: 'Jennifer Olive',
      gender: 'Female',
      email: 'olive@example.com',
      phone_number: '254783998827',
      national_id: '88476625',
      facility: 'Ruaraka Neema Uhai'
    },
    {
      id: 3,
      name: 'Brenda Kemunto',
      gender: 'Female',
      email: 'brenda@example.com',
      phone_number: '254783997387',
      national_id: '77388873',
      facility: 'Ruaraka Neema Uhai'
    }
  ]

  // const rows = useMemo(() => {
  //   if (facility) {
  //     return rowsWithFacility(users)
  //   }

  //   return rowsWithoutFacility(users)
  // }, [users, facility])

  const toggleManageWallet = (user: UserByRole) => {
    setOpen((open) => !open)
    setUser(user)
  }

  // to be used to add transactions/records to modal
  const toggleAdd = () => {
    // router.push('/facility/wallet/' + id)
    setOpenAdd((openAdd) => !openAdd)
  }

  const columnTypes = useMemo(() => {
    if (facility) {
      return colsWithFacilityCol
    }
    return colsWithOutFacilityCol
  }, [facility])

  const rows = useMemo(() => {
    if (sampleData && sampleData) {
      return sampleData.map((sample: any) => ({
        id: sample.id,
        // name: sample.f_name + ' ' + sample.l_name,
        name: sample.name,
        email: sample.email,
        phone: sample.phone_number,
        national_id: sample.national_id,
        facility: sample.facility
      }))
    }
    return []
  }, [sampleData])

  const columns: GridColDef[] = columnTypes.map((col) => {
    switch (col.field) {
      case 'action':
        if (isFacility) {
          return {
            field: col.field,
            headerName: col.headerName,
            width: 200,
            flex: 1,
            renderCell: () => {
              return (
                <Box
                  sx={{
                    display: 'flex'
                  }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                    startIcon={<Wallet />}
                    size="small"
                    onClick={() => toggleAdd()}>
                    Record
                  </Button>
                </Box>
              )
            }
          }
        }

        return {
          field: col.field,
          headerName: col.headerName,
          width: 250,
          renderCell: (params) => {
            return (
              <Box
                sx={{
                  display: 'flex'
                }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                  onClick={() => toggleManageWallet(params.value)}
                  startIcon={<Wallet />}
                  size="small">
                  Manage Wallet
                </Button>
              </Box>
            )
          }
        }

      case 'email': {
        return {
          field: col.field,
          headerName: col.headerName,
          width: 300,
          renderCell: (params) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <a href={`mailto:${params.value}`}>{params.value}</a>
            </Box>
          )
        }
      }

      case 'gender':
        return {
          field: col.field,
          headerName: col.headerName,
          width: 200
        }

      case 'facility':
        return {
          field: col.field,
          headerName: col.headerName,
          width: 300
        }
      default:
        return {
          field: col.field,
          headerName: col.headerName,
          width: 150
        }
    }
  })

  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            backgroundColor: '#DFEBF7',
            padding: '10px'
          }}>
          <Wallet /> Wallet Management
        </Typography>

        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Wallet />}
            onClick={() => toggleViewWalletStatus()}>
            My Wallet
          </Button>
        </CardActions>

        <DataGrid
          rows={rows}
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25
              }
            }
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          density="comfortable"
        />
      </Box>

      <SharedModal items={{ open: openAdd, handleToggle: toggleAdd }}>
        <Center>
          <WalletRecordComponent user={undefined} handleToggle={toggleAdd} />{' '}
        </Center>
      </SharedModal>
      <SharedModal
        items={{
          open,
          handleToggle
        }}>
        <Center>
          <AdminManageWalletComponent
            user={user}
            handleToggle={handleToggle}
            // facilities={facilities}
          />
        </Center>
      </SharedModal>

      <SharedModal items={{ open: walletStatus, handleToggle: toggleViewWalletStatus }}>
        <Center>
          <WalletStatusComponent handleToggle={toggleViewWalletStatus} />
        </Center>
      </SharedModal>
    </>
  )
}

export default ManageWalletComponent
