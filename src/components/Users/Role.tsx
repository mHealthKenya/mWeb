import SharedModal from '@components/Shared/Modal'
import { Facility } from '@models/facility'
import { UserByRole } from '@models/user-by-role'
import { Add, Delete, Edit, Visibility, Wallet } from '@mui/icons-material'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import {
  colsWithFacilityCol,
  colsWithOutFacilityCol,
  rowsWithFacility,
  rowsWithoutFacility
} from 'src/data/users-by-role'
import EditUserWithRoleComponent from './Edit'

const UsersByRoleComponent: React.FC<{
  users: UserByRole[]
  facility?: boolean
  isFacility?: boolean
  facilities?: Facility[]
  visit?: boolean
  sadmin?: boolean
}> = ({ users, facility, isFacility, facilities, visit, sadmin }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<UserByRole>()

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const rows = useMemo(() => {
    if (facility) {
      return rowsWithFacility(users)
    }

    return rowsWithoutFacility(users)
  }, [users, facility])

  const handleEdit = (user: UserByRole) => {
    setOpen(true)
    setUser(user)
  }

  const handleComingSoon = (id: string) => {
    router.push('/facility/mothers/' + id)
  }

  const handleRecord = (id: string) => {
    router.push('/facility/visit/' + id)
  }

  const handleRecordAdmin = (id: string) => {
    router.push('/sadmin/visit/' + id)
  }

  const columnTypes = useMemo(() => {
    if (facility) {
      return colsWithFacilityCol
    }

    return colsWithOutFacilityCol
  }, [facility])

  const columns: GridColDef[] = columnTypes.map((col) => {
    switch (col.field) {
      case 'action':
        if (isFacility) {
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
                    startIcon={<Visibility />}
                    size="small"
                    onClick={() => handleComingSoon(params.value.id)}>
                    View Details
                  </Button>
                </Box>
              )
            }
          }
        }

        if (facility && visit) {
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
                    onClick={
                      sadmin
                        ? () => handleRecordAdmin(params.value.id)
                        : () => handleRecord(params.value.id)
                    }>
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
          width: 500,
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
                  startIcon={<Edit />}
                  size="small"
                  onClick={() => handleEdit(params.value)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mr: 1 }}
                  onClick={() => console.log(params.value)}
                  startIcon={<Delete />}
                  size="small">
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                  onClick={() => console.log(params.value)}
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
          width: 250,
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
          width: 100
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
      <SharedModal
        items={{
          open,
          handleToggle
        }}>
        <EditUserWithRoleComponent
          user={user}
          handleToggle={handleToggle}
          facilities={facilities}
        />
      </SharedModal>
    </>
  )
}

export default UsersByRoleComponent
