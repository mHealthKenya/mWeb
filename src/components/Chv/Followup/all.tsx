import SharedModal from '@components/Shared/Modal'
import { Col } from '@data/users-by-role'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import useAllFollowUp from '@services/followup/all'
import React, { FC, useMemo, useState } from 'react'
import { FollowUp } from '@models/followup'
import { EditFollowUpComponent } from './edit'

export interface FollowUpData {
  followups: FollowUp | undefined
}

export const followUpColumn: Col[] = [
  {
    field: 'title',
    headerName: 'Title'
  },
  {
    field: 'description',
    headerName: 'Description'
  },

  {
    field: 'status',
    headerName: 'Status'
  }
]

const AllFollowUpComponent: FC<{
  data: any
  followUpUpdate: FollowUp | undefined
}> = ({ data }) => {
  const [_open, setOpen] = useState(false)
  const followups: any = useAllFollowUp(data)

  const [openUpdate, setOpenUpdate] = useState(false)

  const [follow, setFollow] = useState<FollowUp | undefined>()

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const handleToggleUpdate = (follow?: FollowUp) => {
    // console.log('edit')
    setOpenUpdate((openUpdate) => !openUpdate)
    setFollow(follow)
  }

  const rows = useMemo(() => {
    if (followups && followups.data) {
      return followups.data.map((followup: any) => ({
        id: followup.id,
        title: followup.schedule.title,
        description: followup.schedule.description,
        status: followup.status,
        schedule: followup.scheduleId,
        chv: followup.chvId
      }))
    }
    return []
  }, [followups])

  const columns: GridColDef[] = useMemo(() => {
    return [
      ...followUpColumn.map((col) => ({
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

      <SharedModal items={{ open: openUpdate, handleToggle }}>
        <EditFollowUpComponent handleToggle={() => handleToggleUpdate()} followUpUpdate={follow!} />
      </SharedModal>
    </>
  )
}

export default AllFollowUpComponent
