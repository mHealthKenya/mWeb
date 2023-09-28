import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '@models/user'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField
} from '@mui/material'
import useAddEnquiry from '@services/ennquiry/add'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
export interface EnquiryFormProps {
  title: string
  description: string
}

const formSchema = Yup.object().shape({
  title: Yup.string().required('Title cannot be empty'),
  description: Yup.string().required('description cannot be empty')
})

export interface EnquiryProps {
  senderId?: string
  facilityId?: string
  user?: User
}

const AddEnquiriesComponent: FC<{
  data: EnquiryProps
}> = ({ data }) => {
  const { senderId, facilityId } = data  || {}
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EnquiryFormProps>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur'
  })

  const { mutate, isLoading } = useAddEnquiry(reset)

  const onSubmit = (data: EnquiryFormProps) => {
    const item = {
      ...data,
      facilityId: facilityId,
      senderId: senderId ?? '',
      replyTitle: '',
      replyDescription: ''
    }

    mutate(item)
    // mutate({
    //   ...data,
    //   facilityId: facilityId,
    // })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title={'Enquiries'} />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="Title"
              type="text"
              size="small"
              fullWidth
              required
              {...register('title')}
              helperText={errors?.title?.message}
              error={!!errors?.title?.message}
              inputProps={{ 'data-testid': 'title_input' }}
            />

            <TextField
              label="Description"
              type="text"
              size="small"
              fullWidth
              required
              multiline
              rows={5}
              {...register('description')}
              error={!!errors?.description?.message}
              helperText={errors?.description?.message}
            />
          </Stack>
        </CardContent>
        <CardActionArea>
          <CardActions>
            <Button variant="contained" color="success" type="submit" disabled={isLoading}>
              {/* Submit */}
              {isLoading ? 'Submitting' : 'Submit'}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </form>
  )
}

export default AddEnquiriesComponent
