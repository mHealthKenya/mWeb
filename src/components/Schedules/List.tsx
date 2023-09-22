import SharedModal from '@components/Shared/Modal'
import { Col } from '@data/users-by-role'
import { UserSchedule } from '@models/schedules'
import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import * as React from 'react'
import { useScheduler } from 'src/context/ScheduleContext'
import EditScheduleComponent from './Edit'

const SchedulesListComponent: React.FC<{ schedules?: UserSchedule[] }> = ({ schedules = [] }) => {
  const [open, setOpen] = React.useState(false)

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const scheduleValue = useScheduler()

  const handleComingSoon = (schedule: UserSchedule) => {
    scheduleValue?.handleSchedule(schedule)
    setOpen((open) => !open)
  }
  const cols: Col[] = [
    {
      field: 'title',
      headerName: 'Title'
    },
    {
      field: 'date',
      headerName: 'Date'
    },
    {
      field: 'status',
      headerName: 'Status'
    },
    {
      field: 'action',
      headerName: 'Action'
    }
  ]

  const fCol: GridColDef[] = cols.map((item) => {
    switch (item.field) {
      case 'action':
        return {
          ...item,
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
                  onClick={() => handleComingSoon(params.value)}>
                  View Details
                </Button>
              </Box>
            )
          }
        }

      default:
        return {
          ...item,
          width: 250
        }
    }
  })

  const nRows = React.useMemo(
    () =>
      schedules.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        status: item.status,
        date: dayjs(item.date).format('DD-MM-YYYY HH:mm'),
        action: item
      })),
    [schedules]
  )

  return (
    <>
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={nRows}
          columns={fCol}
          slots={{ toolbar: GridToolbar }}
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
        <EditScheduleComponent data={{}} handleToggle={handleToggle} />
      </SharedModal>
    </>
  )
}

export default SchedulesListComponent
