import { DischargeRequest } from '@models/discharge-request'
import { Button } from '@ui/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/ui/card'
import dayjs from 'dayjs'
import { Download } from 'lucide-react'
import Image from 'next/image'
import { FC, useState } from 'react'

const DischargeSummary: FC<{ data: DischargeRequest }> = ({ data }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadAllFiles = async () => {
    try {
      setIsDownloading(true)

      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      const filePromises = data.files.map(async (fileUrl, index) => {
        if (!fileUrl) return null
        const response = await fetch(fileUrl)
        const blob = await response.blob()
        const fileName = `discharge-file-${index + 1}${getFileExtension(fileUrl)}`
        return { fileName, blob }
      })

      const files = await Promise.all(filePromises)

      files.forEach((file) => {
        if (file) {
          zip.file(file.fileName, file.blob)
        }
      })

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const zipUrl = window.URL.createObjectURL(zipBlob)
      const link = document.createElement('a')
      link.href = zipUrl
      link.download = `discharge-files-${data.admissionId}.zip`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(zipUrl)
    } catch (error) {
      console.error('Error downloading files:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const getFileExtension = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase()
    if (extension) {
      return `.${extension}`
    }
    return ''
  }

  return (
    <Card className="w-full  py-6 mt-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Discharge Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Patient Information</h3>
            <p>
              Name: {data.admission.user.f_name} {data.admission.user.l_name}
            </p>
            <p>Phone: {data.admission.user.phone_number}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Admission Details</h3>
            <p>Admission ID: {data.admissionId}</p>
            <p>Admitted On: {dayjs(data.admission.createdAt).format('ddd DD MMM YYYY HH:mm a')}</p>
          </div>
        </div>
        <hr />
        <div>
          <h3 className="text-lg font-semibold">Requested By</h3>
          <p>
            {data.requestedBy.f_name} {data.requestedBy.l_name}
          </p>
          <p>Phone: {data.requestedBy.phone_number}</p>
          <p>Requested On: {dayjs(data.createdAt).format('ddd DD MMM YYYY HH:mm a')}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Status</h3>
          <p className="font-medium text-blue-600">{data.status}</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Attached Files</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAllFiles}
              disabled={!data.files?.length || isDownloading}>
              <>
                <Download className="w-4 h-4 mr-2" />
                Download All
              </>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.files.map((file, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={file || '/placeholder.svg'}
                  alt={`Attached file ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="destructive">Reject</Button>
        <Button variant="default">Approve</Button>
      </CardFooter>
    </Card>
  )
}

export default DischargeSummary
