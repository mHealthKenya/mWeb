import CenterComponent from '@components/Shared/Center'
import { ClinicalVisit } from '@models/clinicvisits'
import { Button, Card, CardActions } from '@mui/material'
import dayjs from 'dayjs'
import { FC, useRef } from 'react'
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
      <Card sx={{ minWidth: '680px', mt: 3, mb: 3 }}>
        <div ref={pdfContainerRef} id="download">
          <PrintableVisit visit={visit} title={title} subHeader={subHeader} />
        </div>

        <CardActions>
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
    </CenterComponent>
  )
}

export default VisitComponent
