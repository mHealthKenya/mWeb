import SharedModal from '@components/Shared/Modal'
import { UserByRole } from '@models/user-by-role'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useMemo, useState } from 'react'
import {
  colsWithFacilityCol,
  colsWithOutFacilityCol,
  rowsWithFacility,
  rowsWithoutFacility
} from 'src/data/users-by-role'
import EditUserWithRoleComponent from './Edit'
import Swal from 'sweetalert2'

const UsersByRoleComponent: React.FC<{
  users: UserByRole[]
  facility?: boolean
  isFacility?: boolean
}> = ({ users, facility, isFacility }) => {
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

  const handleComingSoon = () => {
    Swal.fire({
      title: 'Coming soon!',
      text: 'The requested feature is still in development and will be available soon',
      icon: 'info',
      confirmButtonText: 'OK'
    })
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
            renderCell: () => {
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
                    onClick={() => handleComingSoon()}>
                    View Details
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
                  startIcon={<Edit />}
                  size="small"
                  onClick={() => handleEdit(params.value)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => console.log(params.value)}
                  startIcon={<Delete />}
                  size="small">
                  Delete
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
          width: 200
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
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
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
        <EditUserWithRoleComponent user={user} handleToggle={handleToggle} />
      </SharedModal>
    </>
  )
}

export default UsersByRoleComponent
