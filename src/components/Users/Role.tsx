import SharedModal from '@components/Shared/Modal'
import { Facility } from '@models/facility'
import { UserByRole } from '@models/user-by-role'
import { Add, Delete, Edit, Visibility } from '@mui/icons-material'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import useEditUser, { EditUser } from '@services/users/edit-user'
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
  show?: boolean
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

  const { mutate: editUser, isLoading } = useEditUser(() => {})

  const handleDeactivate = (user: UserByRole) => {
    const person: EditUser = {
      id: user.id,
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      role: user.role,
      facilityId: user.facilityId,
      active: !user.active
    }

    editUser(person)

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
          width: 250,
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
                  color={params.value.active ? 'error' : 'success'}
                  startIcon={<Delete />}
                  size="small"
                  onClick={() => handleDeactivate(params.value)}
                  disabled={params.value.id === user?.id && isLoading}>
                  {isLoading && params.value.id === user?.id
                    ? 'Editing...'
                    : params.value.active
                    ? 'Deactivate'
                    : 'Activate'}
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

      case 'national_id':
        return {
          field: col.field,
          headerName: col.headerName,
          width: 150
        }

      case 'date_added':
        return {
          field: col.field,
          headerName: col.headerName,
          width: 150
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
