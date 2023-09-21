import SharedModal from '@components/Shared/Modal'
import { Col } from '@data/users-by-role'
import { Edit } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import useAllFollowUp from '@services/followup/all'
import React, { FC, useMemo, useState } from 'react'

export const followUpColumn: Col[] = [
  {
    field: 'schedule',
    headerName: 'Schedule'
  },
  {
    field: 'chv',
    headerName: 'CHV'
  },
  {
    field: 'status',
    headerName: 'Status'
  }
]

const AllFollowUpComponent: FC<{ data: any }> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const followups: any = useAllFollowUp(data)
  const [openUpdate, setOpenUpdate] = useState(false)

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const handleToggleUpdate = () => {
    console.log('edit')
    setOpenUpdate((openUpdate) => !openUpdate)
  }

  const rows = useMemo(() => {
    if (followups && followups.data) {
      return followups.data.map((followup: any) => ({
        id: followup.id,
        schedule: followup.scheduleId,
        chv: followup.chvId,
        status: followup.status
      }))
    }
    return [] // return an empty array if followups or followups.data is undefined
  }, [followups?.data]) // use optional chaining to avoid error if followups is undefined

  const columns: GridColDef[] = useMemo(() => {
    const actionCol: GridColDef = {
      field: 'actions',
      headerName: 'Actions',
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
              startIcon={<Edit />}
              size="small"
              onClick={() => handleToggleUpdate()}>
              Edit
            </Button>
          </Box>
        )
      }
    }
    return [
      ...followUpColumn.map((col) => ({
        field: col.field,
        headerName: col.headerName,
        flex: 1
      })),
      actionCol
    ]
  }, [])

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

      <SharedModal items={{ open, handleToggle }} children={undefined}></SharedModal>
    </>
  )
}

export default AllFollowUpComponent
