import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { FollowUp } from '@models/followup'
import { Update } from '@mui/icons-material'
import { Box, Button, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import useUpdateFollowUp from '@services/followup/edit'
import React, { FC } from 'react'
import { Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface FollowUpUpdateProps {
  status: string
}

const followUpSchema = Yup.object().shape({
  status: Yup.string().required()
})

export const EditFollowUpComponent: FC<{
  handleToggle: () => void
  followUpUpdate: FollowUp | undefined
}> = ({ handleToggle, followUpUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FollowUpUpdateProps>({
    resolver: yupResolver(followUpSchema)
  })

  const { mutate, isLoading } = useUpdateFollowUp(handleToggle)

  const onSubmit = (data: FollowUpUpdateProps) => {
    mutate({
      id: followUpUpdate?.id || '',
      ...data,
    })
    handleToggle()
  }

  return (
    <CenterComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title={'Update Follow Up'} />
          <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 2, width: '30ch' }
              }}
              noValidate
              autoComplete="off">
              <div>
                <TextField
                  label="Status"
                  type="text"
                  defaultValue={followUpUpdate?.status}
                  {...register('status')}
                  helperText={errors?.status?.message}
                  error={!!errors?.status?.message}
                  inputProps={{ 'data-testid': 'status_input' }}
                />
              </div>
            </Box>

            <CardActions>
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<Update />}
                disabled={isLoading}
                data-testid="submit_button">
                {isLoading ? 'Updating...' : 'Update'}
              </Button>

              <Button variant="contained" color="error" onClick={handleToggle}>
                Cancel
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </CenterComponent>
  )
}

