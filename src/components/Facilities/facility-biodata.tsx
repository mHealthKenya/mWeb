import { FacilityBioData } from '@models/biodata'
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
// import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Col } from 'src/data/users-by-role'

const BioDataByFacility: React.FC<{
  bioData: FacilityBioData[]
  admin: boolean
}> = ({ bioData, admin }) => {
  const router = useRouter()
  const rows = useMemo(
    () =>
      bioData.map((bio) => ({
        id: bio.id,
        Name: bio.user.f_name + ' ' + bio.user.l_name,
        Phone: bio.user.phone_number,
        Age: bio.age,
        // LMP: bio?.last_monthly_period
        //   ? dayjs(bio.last_monthly_period).format('YY-MM-DD HH:mm')
        //   : dayjs(bio.last_clinic_visit).format('YY-MM-DD HH:mm'),
        Action: bio,
        Balance: bio.user?.Wallet[0]?.balance
      })),
    [bioData]
  )

  const columnTypes1: Col[] = [
    {
      field: 'Name',
      headerName: 'Name'
    },

    {
      field: 'Phone',
      headerName: 'Phone'
    },

    {
      field: 'Age',
      headerName: 'Age'
    },

    // {
    //   field: 'LMP',
    //   headerName: 'LMP'
    // },

    {
      field: 'Balance',
      headerName: 'Available Points'
    },

    {
      field: 'Action',
      headerName: 'Action'
    }
  ]

  const handleRedirectAdmin = (bio: FacilityBioData) => {
    router.push('/sadmin/visit/' + bio.id)
  }

  const handleRedirectFacility = (bio: FacilityBioData) => {
    router.push('/facility/visit/' + bio.id)
  }

  const columns: GridColDef[] = columnTypes1.map((col) => {
    switch (col.field) {
      case 'Balance':
        return {
          field: col.field,
          headerName: col.headerName,
          width: 200,
          renderCell: (params) => {
            return <>{JSON.stringify(params.value)}</>
          }
        }

      case 'Action':
        if (admin) {
          return {
            field: col.field,
            headerName: col.headerName,
            width: 200,
            renderCell: (params) => {
              return (
                <Box
                  sx={{
                    display: 'flex'
                  }}>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 1 }}
                    startIcon={<Add />}
                    size="small"
                    onClick={() => handleRedirectAdmin(params.value)}>
                    Record Visit
                  </Button>
                </Box>
              )
            }
          }
        }

        return {
          field: col.field,
          headerName: col.headerName,
          width: 200,
          renderCell: (params) => {
            return (
              <Box
                sx={{
                  display: 'flex'
                }}>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ mr: 1 }}
                  startIcon={<Add />}
                  size="small"
                  onClick={() => handleRedirectFacility(params.value)}
                  disabled={params.value.user.Wallet[0].balance <= 0}>
                  Record Visit
                </Button>
              </Box>
            )
          }
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
        <DataGrid
          rows={rows}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
          columns={columns}
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
    </>
  )
}

export default BioDataByFacility
