import SharedModal from '@components/Shared/Modal'
import { Col } from '@data/users-by-role'
import { Box, Button, CardActions } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { FC, useMemo, useState } from 'react'
import useAllChvMothers from '@services/chvmother/all'
import { UserByRole } from '@models/user-by-role'
import Center from '@components/Shared/CenterVert'
import { ChvMothers } from '@models/chvmothers'
import { ViewTargetComponent } from '../Target/all'
import { Add, ViewTimelineTwoTone } from '@mui/icons-material'
import { Target } from '@models/target'
import AddMotherComponent from './add'
import { User } from '@models/biodata'

export interface ChvMothersData {
  chvmothers: ChvMothers | undefined
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
  target?: Target
  user: UserByRole
}> = ({ data, chv, target, user }) => {
  const [open, setOpen] = useState(false)
  const [_openAdd, _setOpenAdd] = useState(false)
  const chvmothers = useAllChvMothers(data)
  const [viewTarget, setViewTarget] = useState(false)

  const toggleAdd = () => {
    setOpen((open) => !open)
  }

  const toggleViewTarget = () => {
    setViewTarget((viewTarget) => !viewTarget)
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
  }, [chvmothers?.data])

  const columns: GridColDef[] = useMemo(() => {
    return [
      ...chvMothersColumn.map((col) => ({
        field: col.field,
        headerName: col.headerName,
        flex: 1
      }))
      // actionCol
    ]
  }, [])

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
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 9
              }
            }
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          density="comfortable"
        />
      </Box>

      <SharedModal items={{ open, handleToggle: toggleAdd }}>
        <Center>
          <AddMotherComponent datas={user} handleToggle={toggleAdd} />{' '}
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
