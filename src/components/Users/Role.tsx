import SharedModal from '@components/Shared/Modal'
import { UserByRole } from '@models/user-by-role'
import { Delete, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { useState } from 'react'
import EditUserWithRoleComponent from './Edit'

interface Col {
  field: string
  headerName: string
}

const cols: Col[] = [
  {
    field: 'f_name',
    headerName: 'First Name'
  },
  {
    field: 'l_name',
    headerName: 'Last Name'
  },
  {
    field: 'gender',
    headerName: 'Gender'
  },
  {
    field: 'email',
    headerName: 'Email'
  },
  {
    field: 'role',
    headerName: 'Role'
  },
  {
    field: 'action',
    headerName: 'Action'
  }
]

const UsersByRoleComponent: React.FC<{ users: UserByRole[] }> = ({ users }) => {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<UserByRole>()

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const rows = users.map((user) => ({
    id: user.id,
    f_name: user.f_name,
    l_name: user.l_name,
    gender: user.gender,
    email: user.email,
    role: user.role,
    action: user,
    user
  }))

  const handleEdit = (user: UserByRole) => {
    setOpen(true)
    setUser(user)
  }

  const columns: GridColDef[] = cols.map((col) => {
    switch (col.field) {
      case 'action':
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
          width: 200,
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
