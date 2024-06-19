import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { MotherTransactions } from '@models/transaction'
import { UserByRole } from '@models/user-by-role'
import { Cancel, CloudUploadOutlined, Money } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  InputAdornment,
  Stack,
  TextField,
  styled
} from '@mui/material'
import useManageTransaction from '@services/transaction/edit'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface ManageTransactionProps {
  description: string
  amount: string
  status: string
  facilityId?: string
}

const validationSchema: any = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  amount: Yup.string().required('Amount is required'),
  status: Yup.string().required('Status is required'),
  facilityId: Yup.string().optional()
})

const AdminManageWalletComponent: FC<{
  user: UserByRole | undefined
  transaction: MotherTransactions | undefined
  handleToggle: () => void
  data?: any
}> = ({ handleToggle, transaction, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ManageTransactionProps>({
    resolver: yupResolver(validationSchema)
  })

  const { mutate, isLoading } = useManageTransaction(handleToggle)

  const onSubmit = (data: ManageTransactionProps) => {
    mutate({
      userId: '' + user?.id,
      facilityId: user?.facilityId || '',
      ...data
    })
  }

  // const drugsissued = ['Yes', 'No']
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '40px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 5
  })

  return (
    <CenterComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: 680, mt: 3, mb: 3 }}>
          <CardHeader
            title="Redeem Transaction."
            subheader="All fields marked with * are required fields"
          />
          <CardContent>
            <Stack spacing={1}>
              <TextField
                size="small"
                fullWidth
                label="Description"
                rows={4}
                multiline
                defaultValue={transaction?.description}
                {...register('description')}
                helperText={errors?.description?.message}
                error={!!errors?.description?.message}
                inputProps={{ 'data-testid': 'description_input' }}
              />
              <br />
              <div style={{ display: 'flex', gap: '16px' }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Amount Charged"
                  variant="filled"
                  defaultValue={transaction?.amount}
                  {...register('amount')}
                  required
                  helperText={errors?.amount?.message}
                  error={!!errors?.amount?.message}
                  inputProps={{ 'data-testid': 'amount_input' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Ksh: </InputAdornment>
                  }}
                />
              </div>
              <br />
              <TextField
                size="small"
                fullWidth
                label="Status"
                defaultValue={transaction?.status}
                {...register('status')}
                required
                helperText={errors?.status?.message}
                error={!!errors?.status?.message}
                inputProps={{ 'data-testid': 'status_input' }}
              />
              <br />
              <div style={{ display: 'flex', gap: '20px' }}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadOutlined />}>
                  Download invoice
                  <VisuallyHiddenInput type="file" />
                </Button>
              </div>{' '}
              <br />
            </Stack>
            {/* </Box> */}

            <CardActions>
              <Button
                variant="contained"
                color="error"
                type="submit"
                startIcon={<Cancel />}
                disabled={isLoading}>
                {isLoading ? 'Submiting' : 'Reject Transaction'}
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<Money />}
                disabled={isLoading}>
                {isLoading ? 'Submiting' : 'Redeem Transaction'}
              </Button>

              <Button variant="outlined" color="error" onClick={handleToggle}>
                Cancel
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </CenterComponent>
  )
}

export default AdminManageWalletComponent
