import SharedModal from '@components/Shared/Modal'
import { ClinicalVisit } from '@models/clinicvisits'
import { Visibility } from '@mui/icons-material'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import VisitComponent from './visit'

export enum VisitMessage {
  View = 'View Visit',
  Redirect = 'View Graph'
}

const columnsI = ['Name', 'Phone', 'Age', 'Date', 'Action']

const ClinicalVisitsComponent: FC<{
  visits: ClinicalVisit[]
  admin: boolean
  message: string
}> = ({ visits, admin, message }) => {
  const [open, setOpen] = useState(false)
  const [visit, setVisit] = useState<ClinicalVisit | null>(null)
  const router = useRouter()

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const handleView = (data: ClinicalVisit) => {
    setOpen((open) => !open)
    setVisit(data)
  }

  const handleRedirect = (data: ClinicalVisit) => {
    router.push(`/facility/visit/graph/${data.bioDataId}`)
  }

  const handleRedirectAdmin = (data: ClinicalVisit) => {
    router.push(`/sadmin/visit/graph/${data.bioDataId}`)
  }

  const columns: GridColDef[] = columnsI.map((item) => {
    switch (item) {
      case 'Action':
        return {
          field: item,
          headerName: item,
          width: 200,
          renderCell: (params) => {
            return (
              <Box
                sx={{
                  display: 'flex'
                }}>
                {admin && message === VisitMessage.Redirect ? (
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 1 }}
                    startIcon={<Visibility />}
                    size="small"
                    onClick={() => handleRedirectAdmin(params.value)}>
                    {VisitMessage.Redirect}
                  </Button>
                ) : !admin && message === VisitMessage.Redirect ? (
                  <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 1 }}
                    startIcon={<Visibility />}
                    size="small"
                    onClick={() => handleRedirect(params.value)}>
                    {VisitMessage.Redirect}
                  </Button>
                ) : (
                  message === VisitMessage.View && (
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ mr: 1 }}
                      startIcon={<Visibility />}
                      size="small"
                      onClick={() => handleView(params.value)}>
                      {VisitMessage.View}
                    </Button>
                  )
                )}
              </Box>
            )
          }
        }

      case 'Name':
        return {
          field: item,
          headerName: item,
          width: 250
        }

      default:
        return {
          field: item,
          headerName: item,
          width: 150
        }
    }
  })

  const rows = visits.map((visit) => ({
    id: visit.id,
    Name: visit.bioData.user.f_name + ' ' + visit.bioData.user.l_name,
    Phone: visit.bioData.user.phone_number,
    Age: visit.bioData.age,
    Date: dayjs(new Date(visit.createdAt)).format('YYYY-MM-DD HH:mm'),
    Action: visit,
    visit
  }))

  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15
              }
            }
          }}
          pageSizeOptions={[5]}
          density="comfortable"
          disableRowSelectionOnClick
        />
      </Box>

      <SharedModal
        items={{
          open,
          handleToggle
        }}>
        <VisitComponent visit={visit!} handleClose={handleToggle} />
      </SharedModal>
    </>
  )
}

export default ClinicalVisitsComponent
