import { Col } from '@data/users-by-role'
import { Appointments } from '@models/appointments'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import useAppointments from '@services/appointment/all'
import React, { FC, useMemo } from 'react'

export interface Appointmentdata {
  appointments: Appointments | undefined
}

export const appointmentsColumns: Col[] = [
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
  },
  {
    field: 'mother',
    headerName: 'Mother'
  }
]

export const ViewAppointmentCoomponent: FC<{
  data: any
}> = ({ data }) => {
  const appointments = useAppointments(data)
  const rows = useMemo(() => {
    if (appointments && appointments.data) {
      return appointments.data.map((appointment: any) => ({
        id: appointment.id,
        title: appointment.title,
        description: appointment.description,
        status: appointment.status,
        mother: appointment.mother.f_name + ' ' + appointment.mother.l_name
      }))
    }
    return []
  }, [appointments?.data])

  const columns: GridColDef[] = useMemo(() => {
    return [
      ...appointmentsColumns.map((col) => ({
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
                pageSize: 9
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
