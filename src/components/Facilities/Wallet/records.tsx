import SharedModal from '@components/Shared/Modal'
import { Col } from '@data/users-by-role'
import { Box, Button, Card, CardActions } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { FC, useMemo, useState, useRef } from 'react'
import { ChvMothers } from '@models/chvmothers'
import { RemoveRedEyeSharp } from '@mui/icons-material'
import TransactionComponent from './printablesingletransaction'
import CenterComponent from '@components/Shared/Center'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export interface ChvMothersData {
  chvmothers: ChvMothers
}

export const chvMothersColumn: Col[] = [
  {
    field: 'name',
    headerName: 'Name'
  },
  {
    field: 'phone',
    headerName: 'Phone'
  },
  {
    field: 'national_id',
    headerName: 'National ID'
  },
  {
    field: 'date',
    headerName: 'Date'
  },
  {
    field: 'action',
    headerName: 'Action'
  }
]

const RecordsComponent: FC<{
  data: any
  handleClose: () => void
  //   chv: User
  //   target: Target
  //   user: UserByRole
}> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [_openAdd, _setOpenAdd] = useState(false)
  const pdfContainerRef = useRef<HTMLDivElement | null>(null)

  const generatePDF = async () => {
    if (!pdfContainerRef.current) return

    const pdfContainer = pdfContainerRef.current
    const canvas = await html2canvas(pdfContainer)

    const imageData = canvas.toDataURL('image/png')

    const pdf = new JsPDF()

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight)

    await pdf.save('trasaction.pdf')

    // handleClose()
  }

  const toggleView = () => {
    setOpen((open) => !open)
  }

  const sampleData = [
    {
      id: 1,
      name: 'Alice Waithira',
      email: 'alice@example.com',
      phone_number: '254798883776',
      national_id: '33766637',
      facility: 'Ruaraka Neema Uhai',
      date: '12/12/2024'
    },
    {
      id: 2,
      name: 'Jennifer Olive',
      email: 'bob@example.com',
      phone_number: '254783998827',
      national_id: '88476625',
      facility: 'Ruaraka Neema Uhai',
      date: '12/10/2024'
    },
    {
      id: 1,
      name: 'Alice Waithira',
      email: 'alice@example.com',
      phone_number: '254798883776',
      national_id: '33766637',
      facility: 'Ruaraka Neema Uhai',
      date: '12/12/2024'
    }
  ]

  const rows = useMemo(() => {
    if (sampleData && sampleData) {
      return sampleData.map((sample: any) => ({
        id: sample.id,
        name: sample.name,
        phone: sample.phone_number,
        national_id: sample.national_id,
        date: sample.date
      }))
    }
    return []
  }, [sampleData])

  const columns: GridColDef[] = useMemo(() => {
    return [
      ...chvMothersColumn.map((col) => {
        if (col.field === 'action') {
          return {
            field: col.field,
            headerName: col.headerName,
            width: 200,
            flex: 1,
            renderCell: () => (
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 1 }}
                startIcon={<RemoveRedEyeSharp />}
                size="small"
                onClick={() => toggleView()}>
                View Transaction
              </Button>
            )
          }
        }
        return {
          field: col.field,
          headerName: col.headerName,
          flex: 1
        }
      })
    ]
  }, [])

  return (
    <>
      <Box sx={{ height: 800, width: '100%' }}>
        <CardActions></CardActions>
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

      <SharedModal items={{ open, handleToggle: toggleView }}>
        <CenterComponent>
          <Card sx={{ minWidth: '680px', mt: 3, mb: 3 }}>
            <div ref={pdfContainerRef} id="download">
              <TransactionComponent
                visit={data}
                title="Transaction Details"
                subHeader="Detailed View"
              />
            </div>
            <CardActions>
              {/* <Button
                variant="contained"
                color="success"
                data-testid="submit_button"
                onClick={handleClose}>
                Close
              </Button> */}

              <Button
                variant="contained"
                color="warning"
                data-testid="download_button"
                onClick={generatePDF}>
                Download
              </Button>
            </CardActions>
          </Card>
        </CenterComponent>
      </SharedModal>
    </>
  )
}

export default RecordsComponent
