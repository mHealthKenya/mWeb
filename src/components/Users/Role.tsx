import AddBioDataComponent from '@components/Biodata/AddBioData'
import SharedModal from '@components/Shared/Modal'
import { Facility } from '@models/facility'
import { UserByRole } from '@models/user-by-role'
import { Add, Delete, Edit, Visibility } from '@mui/icons-material'
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
import ViewBioDataComponent from './view'

const UsersByRoleComponent: React.FC<{
  user?: UserByRole
  users: UserByRole[]
  facility?: boolean
  isFacility?: boolean
  facilities?: Facility[]
  visit?: boolean
  sadmin?: boolean
}> = ({ users, facility, isFacility, facilities, visit, sadmin, user }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [add, setAdd] = useState(false)
  const [, setEditUser] = useState<UserByRole>()
  const [data, setData] = useState<UserByRole>()
  const [addBio, setAddBio] = useState<UserByRole>()
  const [, setIsLoading] = useState(true)
  const [, setError] = useState<string | null>(null)

  const [mother, setMother] = useState<UserByRole>()

  //  const {bioData} = useAddBioData({facilityId : })

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const toggleView = () => {
    setShow((show) => !show)
  }

  const toggleAdd = () => {
    setAdd((add) => !add)
  }

  const rows = useMemo(() => {
    if (facility) {
      return rowsWithFacility(users)
    }

    return rowsWithoutFacility(users)
  }, [users, facility])

  const handleEdit = (editUser: UserByRole) => {
    setOpen(true)
    setEditUser(editUser)
  }

  const handleViewDetails = async (bio: UserByRole) => {
    try {
      // console.log(bio)

      setData(bio)
      setShow(true)
    } catch (error) {
      setError('Error fetching biodata' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = (data: UserByRole) => {
    setAdd(true)
    setAddBio(addBio)
    setMother(data)
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
            width: 500,
            renderCell: (params) => {
              return (
                <Box
                  sx={{
                    display: 'flex'
                  }}>
                  {params.value?.BioData?.length > 0 ? (
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ mr: 1 }}
                      startIcon={<Visibility />}
                      size="small"
                      onClick={() => handleViewDetails(params.value)}>
                      View Details
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      startIcon={<Add />}
                      size="small"
                      onClick={() => handleAdd(params.value)}>
                      Add
                    </Button>
                  )}
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
      <Box sx={{ height: 450, width: '100%' }}>
        <DataGrid
          rows={rows}
          slots={{ toolbar: GridToolbar }}
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
      {}
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

      <SharedModal
        items={{
          open: show,
          handleToggle: toggleView
        }}>
        <ViewBioDataComponent bio={data} handleToggle={toggleView} />
      </SharedModal>

      {/* <SharedModal
        items={{
          open: openEdit,
          handleToggle: handleEditComp
        }}>
        <EditBioDataComponent bioDataUpdate={user!} handleToggle={handleEditComp} />
      </SharedModal> */}

      <SharedModal
        items={{
          open: add,
          handleToggle: toggleAdd
        }}>
        <AddBioDataComponent handleToggle={toggleAdd} user={user} mother={mother} />
      </SharedModal>
    </>
  )
}

export default UsersByRoleComponent
