import { Col } from '@data/users-by-role'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import useAllAppointments from '@services/appointments/all'
import React, { FC, useMemo } from 'react'

export const appointmentsColumn: Col[] = [
  {
    field: 'date',
    headerName: 'Date'
  },
  {
    field: 'status',
    headerName: 'Status'
  },
  {
    field: 'purpose',
    headerName: 'Purpose'
  },
  {
    field: 'description',
    headerName: 'Description'
  }
]

const AllAppointmentsCompoent: FC<{
  data: any
}> = ({ data }) => {
  const appointments: any = useAllAppointments(data)

  const rows = useMemo(() => {
    if (appointments && appointments.data) {
      return appointments.data.map((appointment: any) => ({
        id: appointment.id,
        date: appointment.date,
        status: appointment.status,
        purpose: appointment.purpse,
        description: appointment.schedule.description
      }))
    }
    return []
  }, [appointments.data])

  const columns: GridColDef[] = useMemo(() => {
    return [
      ...appointmentsColumn.map((col) => ({
        field: col.field,
        headerName: col.headerName,
        flex: 1
      }))
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
    </>
  )
}

export default AllAppointmentsCompoent
