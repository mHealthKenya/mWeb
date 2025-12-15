import Center from '@components/Shared/CenterVert'
import SharedModal from '@components/Shared/Modal'
import { Col } from '@data/users-by-role'
import { User } from '@models/biodata'
import { ChvMothers } from '@models/chvmothers'
import { Target } from '@models/target'
import { UserByRole } from '@models/user-by-role'
import { Add, ArrowForward, ViewTimelineTwoTone } from '@mui/icons-material'
import { Box, Button, CardActions } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef, GridToolbar } from '@mui/x-data-grid'
import useAllChvMothers from '@services/chvmother/all'
import { FC, useMemo, useState } from 'react'
import { ViewTargetComponent } from '../Target/all'
import AddMotherComponent from './add'
import { useRouter } from 'next/router'

export interface ChvMothersData {
  chvmothers: ChvMothers
}

export const chvMothersColumn: Col[] = [
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
  }
]

const ChvMothersComponent: FC<{
  data: any
  chv: User
  target: Target
  user: UserByRole
}> = ({ data, user, target }) => {
  const [open, setOpen] = useState(false)
  const [_openAdd, _setOpenAdd] = useState(false)
  const chvmothers = useAllChvMothers(data)
  const [viewTarget, setViewTarget] = useState(false)
  const router = useRouter()

  const toggleAdd = () => {
    setOpen((open) => !open)
  }

  const toggleViewTarget = () => {
    setViewTarget((viewTarget) => !viewTarget)
  }

  // Handler for row actions
  const handleView = (id: string | number) => {
    console.log('View mother:', id)

    router.push(`/chp/deliveries/${id}`)
    // Add your view logic here
  }

  const rows = useMemo(() => {
    if (chvmothers && chvmothers.data) {
      return chvmothers.data.map((chvmother: any) => ({
        id: chvmother.id,
        name: chvmother.f_name + ' ' + chvmother.l_name,
        email: chvmother.email,
        phone: chvmother.phone_number,
        national_id: chvmother.national_id
      }))
    }
    return []
  }, [chvmothers])

  const columns: GridColDef[] = useMemo(() => {
    return [
      ...chvMothersColumn.map((col) => ({
        field: col.field,
        headerName: col.headerName,
        flex: 1
      })),
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 150,
        getActions: (params) => [
          <GridActionsCellItem
            key="edit"
            icon={<ArrowForward />}
            label="View"
            onClick={() => handleView(params.id)}
            showInMenu={false}
          />
        ]
      }
    ]
  }, [handleView])

  return (
    <>
      <Box sx={{ height: 800, width: '100%' }}>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Add />}
            onClick={() => toggleAdd()}>
            Add Mother
          </Button>

          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<ViewTimelineTwoTone />}
            onClick={() => toggleViewTarget()}>
            My Target
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
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          density="comfortable"
        />
      </Box>

      <SharedModal items={{ open, handleToggle: toggleAdd }}>
        <Center>
          <AddMotherComponent user={user} handleToggle={toggleAdd} datas={data} />{' '}
        </Center>
      </SharedModal>

      <SharedModal items={{ open: viewTarget, handleToggle: toggleViewTarget }}>
        <Center>
          <ViewTargetComponent handleToggle={toggleViewTarget} target={target} />
        </Center>
      </SharedModal>
    </>
  )
}

export default ChvMothersComponent
