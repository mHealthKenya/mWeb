import SharedModal from '@components/Shared/Modal'
import { UserByRole } from '@models/user-by-role'
import { Add, Delete, Edit, Visibility } from '@mui/icons-material'
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
import ViewBioDataComponent from './view'
import AddBioDataComponent from '@components/Biodata/AddBioData'
import { AddBioData } from '@models/add-bio-data'

const UsersByRoleComponent: React.FC<{
  users: UserByRole[]
  facility?: boolean
  isFacility?: boolean
}> = ({ users, facility, isFacility }) => {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [add, setAdd] = useState(false)
  const [user, setUser] = useState<UserByRole>()
  const [data, setData] = useState<UserByRole>();
  const [addBio, setAddBio] = useState<AddBioData>();
  const [ isLoading, setIsLoading] = useState(true);
  const [ error, setError ] = useState<string | null>(null);

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
    }3

    return rowsWithoutFacility(users)
  }, [users, facility])

  const handleEdit = (user: UserByRole) => {
    setOpen(true)
    setUser(user)
  }

  const handleViewDetails = async (bio: UserByRole) => {
    try {
      // console.log(bio)
      
      setData(bio);
      setShow(true); // Open the modal after data is fetched successfully
    } catch (error) {
      setError('Error fetching biodata' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd =  ( ) => {
    setAdd(true)
    setAddBio(addBio)
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

                    { params.value?.BioData?.length > 0 ?
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 1 }}
                    startIcon={<Visibility />}
                    size="small"
                    onClick={() => handleViewDetails(params.value)}
                    >
                      View Details
                  </Button> 
                  :

                   <Button
                    variant="contained"
                    color="success" 
                    sx={{ mr: 1 }}
                    startIcon={<Add />}
                    size="small"
                    onClick={() => handleAdd()}>
                    Add
                  </Button> 
                  }
                  
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
      {}
      <SharedModal
        items={{
          open,
          handleToggle
        }}>
        <EditUserWithRoleComponent user={user} handleToggle={handleToggle} />
      </SharedModal>

      <SharedModal
        items={{
          open: show,
          handleToggle : toggleView
        }}>
          
        <ViewBioDataComponent bio={data} handleToggle={toggleView} /> 
      </SharedModal>


      <SharedModal
        items={{
          open: add,
          handleToggle : toggleAdd
        }}>
        <AddBioDataComponent bioData={addBio} handleToggle={toggleAdd} />
      </SharedModal>
    </>
  )
}

export default UsersByRoleComponent