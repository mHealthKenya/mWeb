import CenterComponent from '@components/Shared/Center'
import { ClinicalVisit } from '@models/clinicvisits'
import { Button, Card, CardActions, Box } from '@mui/material'
import dayjs from 'dayjs'
import { FC, useEffect, useRef } from 'react'
import PrintableVisit from './printablevisit'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const VisitComponent: FC<{ visit: ClinicalVisit; handleClose: () => void }> = ({
  visit,
  handleClose
}) => {
  const title = `Visit details for ${visit.bioData.user.f_name} ${visit.bioData.user.l_name}`
  const subHeader = `${dayjs(new Date(visit.createdAt)).format('YYYY-MM-DD HH:mm')}`
  const pdfContainerRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  // Close when clicking outside the card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClose])

  const generatePDF = async () => {
    if (!pdfContainerRef.current) return

    const pdfContainer = pdfContainerRef.current
    const canvas = await html2canvas(pdfContainer)
    const imageData = canvas.toDataURL('image/png')

    const pdf = new JsPDF()
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    await pdf.save('visit.pdf')
    handleClose()
  }

  return (
    <CenterComponent>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Card
          ref={cardRef}
          sx={{
            minWidth: 680,
            maxHeight: '80vh',
            overflowY: 'auto', // ✅ Make it scrollable
            mt: 3,
            mb: 3,
            p: 2
          }}>
          <div ref={pdfContainerRef} id="download">
            <PrintableVisit visit={visit} title={title} subHeader={subHeader} />
          </div>

          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2
            }}>
            <Button
              variant="contained"
              color="success"
              data-testid="submit_button"
              onClick={handleClose}>
              Close
            </Button>

            <Button
              variant="contained"
              color="warning"
              data-testid="download_button"
              onClick={generatePDF}>
              Download
            </Button>
          </CardActions>
        </Card>
      </Box>
    </CenterComponent>
  )
}

export default VisitComponent
