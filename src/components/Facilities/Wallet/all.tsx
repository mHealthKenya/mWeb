import { Box, Button, CardActions, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { useMemo, useState } from 'react'
import WalletRecordComponent from './add'
import { Wallet } from '@mui/icons-material'
import Center from '@components/Shared/CenterVert'
import SharedModal from '@components/Shared/Modal'
import {
  colsWithFacilityCol,
  colsWithOutFacilityCol,
  rowsWithFacility,
  rowsWithoutFacility
} from 'src/data/users-by-role'
import AdminManageWalletComponent from './managewallet'
import { WalletStatusComponent } from './walletstatus'
import { UserByRole } from '@models/user-by-role'
import { WalletByUserID } from '@models/wallet'
import { ClinicalVisit } from '@models/clinicvisits'
import { FacilityBioData } from '@models/biodata'
import { MotherTransactions } from '@models/transaction'

// export interface ChvMothersData {
//   chvmothers: ChvMothers
// }

// export const FacilityWalletColumn: Col[] = [
//   {
//     field: 'name',
//     headerName: 'Name'
//   },
//   {
//     field: 'email',
//     headerName: 'Email'
//   },
//   {
//     field: 'phone',
//     headerName: 'Phone'
//   },
//   {
//     field: 'national_id',
//     headerName: 'National ID'
//   },
//   {
//     field: 'facility',
//     headerName: 'Facility'
//   },
//   {
//     field: 'action',
//     headerName: 'Action'
//   }
// ]

const ManageWalletComponent: React.FC<{
  users: UserByRole[]
  status: WalletByUserID[]
  facility?: boolean
  isFacility?: boolean
  admin?: boolean
  visit?: boolean
  visits?: ClinicalVisit[]
  bioData?: FacilityBioData[]
  transactions: MotherTransactions[]
  data?: any
}> = ({ facility, status, users, isFacility, transactions, visits }) => {
  const [open, setOpen] = useState(false)
  const [openTrans, setOpenTrans] = useState(false)
  const [balance, setBalance] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [walletStatus, setWalletStatus] = useState(false)
  const [user, setUser] = useState<UserByRole>()
  const [userBalance, setUserBalance] = useState<WalletByUserID>()
  const [transaction, setTransaction] = useState<MotherTransactions>()

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
    },
    {
      id: 4,
      name: 'Irene Oketch',
      gender: 'Female',
      email: 'iree@example.com',
      phone_number: '254788999387',
      national_id: '99288837',
      facility: 'Ruaraka Neema Uhai'
    },
    {
      id: 5,
      name: 'Doris Achieng',
      gender: 'Female',
      email: 'doris@example.com',
      phone_number: '254673899827',
      national_id: '66378829',
      facility: 'Ruaraka Neema Uhai'
    },
    {
      id: 6,
      name: 'Joyce Langat',
      gender: 'Female',
      email: 'langat@example.com',
      phone_number: '254673889928',
      national_id: '88398827',
      facility: 'Ruaraka Neema Uhai'
    }
  ]

  // const rows = useMemo(() => {
  //   if (facility) {
  //     return rowsWithFacility(users)
  //   }

  //   return rowsWithoutFacility(users)
  // }, [users, facility, transactions])

  const toggleManageWallet = (transaction: MotherTransactions) => {
    setOpen(true)
    setTransaction(transaction)
    // console.log('transactions', transaction.description)
  }

  const toggleViewBalance = (userBalance: WalletByUserID) => {
    setBalance(true)
    setUserBalance(userBalance)
  }

  // to be used to add transactions/records to modal
  const toggleAdd = () => {
    setOpenAdd((openAdd) => !openAdd)
  }

  const columnTypes = useMemo(() => {
    if (facility) {
      return colsWithFacilityCol
    }
    return colsWithOutFacilityCol
  }, [facility])

  // const rows = useMemo(() => {
  //   if (visits && visits) {
  //     return visits.map((sample: any) => ({
  //       id: sample.id,
  //       name: sample.bioData.user.f_name + ' ' + sample.bioData.user.l_name,
  //       gender: sample.bioData.user.gender,
  //       phone: sample.bioData.user.phone_number,
  //       facility: sample.bioData.user.facility
  //       // facility: sample.bioData.user.facilityId
  //     }))
  //   }
  //   return []
  // }, [visits])

  const rows = useMemo(() => {
    if (sampleData && sampleData) {
      return sampleData.map((sample: any) => ({
        id: sample.id,
        name: sample.name,
        gender: sample.gender,
        phone: sample.phone_number,
        facility: sample.facility
        // facility: sample.bioData.user.facilityId
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
          width: 400,
          renderCell: (params) => {
            return (
              <Box
                sx={{
                  display: 'flex'
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() => toggleManageWallet(params.value)}
                  startIcon={<Wallet />}
                  size="small">
                  Manage Wallet
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                  onClick={() => toggleViewBalance(params.value)}
                  startIcon={<Wallet />}
                  size="small">
                  Balance
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
            transaction={transaction}
          />
        </Center>
      </SharedModal>

      <SharedModal items={{ open: walletStatus, handleToggle: toggleViewWalletStatus }}>
        <Center>
          <WalletStatusComponent handleToggle={toggleViewWalletStatus} status={status} />
        </Center>
      </SharedModal>
    </>
  )
}

export default ManageWalletComponent
