import CenterComponent from '@components/Shared/Center'
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import React, { FC } from 'react'
import { Add } from '@mui/icons-material'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserByRole } from '@models/user-by-role'
import useAddBirthPlan from '@services/birthplan/add'

export interface AddBirthPlanProps {
  delivery_mode: string
  preferred_transport: string
  alternative_facility_id: string
  support_person_name: string
  support_person_phone: string
  preferred_attendant_name: string
  preferred_attendant_phone: string
  blood_donor_name: string
  blood_donor_phone: string
  emergency_decision_maker_phone: string
  emergency_decision_maker_name: string
  emergency_cs_plan: string
  savings_plan: string
  delivery_bag: boolean
}

const schema = Yup.object().shape({
  delivery_mode: Yup.string().required(),
  preferred_transport: Yup.string().required(),
  alternative_facility_id: Yup.string().optional(),
  support_person_name: Yup.string().optional(),
  support_person_phone: Yup.string().optional(),
  preferred_attendant_name: Yup.string().optional(),
  preferred_attendant_phone: Yup.string().optional(),
  blood_donor_name: Yup.string().optional(),
  blood_donor_phone: Yup.string().optional(),
  emergency_decision_maker_phone: Yup.string().optional(),
  emergency_decision_maker_name: Yup.string().optional(),
  emergency_cs_plan: Yup.string().optional(),
  savings_plan: Yup.string().optional(),
  delivery_bag: Yup.boolean().required()
})

const AddBirthPlanComponent: FC<{
  handleToggle: () => void
  user?: UserByRole
  mother?: UserByRole
}> = ({ handleToggle, user, mother }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddBirthPlanProps>({
    resolver: yupResolver(schema)
  })

  const { mutate, isLoading } = useAddBirthPlan(reset)
  const onSubmit = (data: AddBirthPlanProps) => {
    console.log('birthplan', { ...user })

    const item = {
      ...data,

      facilityId: user?.facilityId || '',
      motherId: mother?.id || '',
      alternative_facility_id: user?.facilityId || ''
    }
    mutate(item)

    handleToggle()
  }

  return (
    <CenterComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title={'Birth Plan'} />
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
                  label="Delivery Mode"
                  id="outlined-size-small"
                  placeholder="Delivery Mode"
                  type="text"
                  // size="small"
                  {...register('delivery_mode')}
                  required
                  helperText={errors?.delivery_mode?.message}
                  error={!!errors?.delivery_mode?.message}
                  inputProps={{ 'data-testid': 'delivery_mode_input' }}
                />
                <TextField
                  label="Preffered Transport"
                  id="outlined-size-small"
                  placeholder="Preffered Transport"
                  type="text"
                  {...register('preferred_transport')}
                  required
                  helperText={errors?.preferred_transport?.message}
                  error={!!errors?.preferred_transport?.message}
                  inputProps={{ 'data-testid': 'preferred_transport_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Alternative Facility"
                  id="outlined-size-small"
                  placeholder="Alternative Facility"
                  type="text"
                  // size="small"
                  {...register('alternative_facility_id')}
                  required
                  helperText={errors?.alternative_facility_id?.message}
                  error={!!errors?.alternative_facility_id?.message}
                  inputProps={{ 'data-testid': 'alternative_facility_id_input' }}
                />
                <TextField
                  label="Support Person Name"
                  id="outlined-size-small"
                  placeholder="Support Person Name"
                  type="text"
                  {...register('support_person_name')}
                  required
                  helperText={errors?.support_person_name?.message}
                  error={!!errors?.support_person_name?.message}
                  inputProps={{ 'data-testid': 'support_person_name_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Support Person Phone"
                  id="outlined-size-small"
                  placeholder="Support Person Phone"
                  type="text"
                  // size="small"
                  {...register('support_person_phone')}
                  required
                  helperText={errors?.support_person_phone?.message}
                  error={!!errors?.support_person_phone?.message}
                  inputProps={{ 'data-testid': 'support_person_phone_input' }}
                />
                <TextField
                  label="Preferred Attendant Name"
                  id="outlined-size-small"
                  placeholder="Preffered Attendant Name"
                  type="text"
                  {...register('preferred_attendant_name')}
                  required
                  helperText={errors?.preferred_attendant_name?.message}
                  error={!!errors?.preferred_attendant_name?.message}
                  inputProps={{ 'data-testid': 'preferred_attendant_name_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Preferred Attendant Phone"
                  id="outlined-size-small"
                  placeholder="Preffered Attedant Phone"
                  type="number"
                  // size="small"
                  {...register('preferred_attendant_phone')}
                  required
                  helperText={errors?.preferred_attendant_phone?.message}
                  error={!!errors?.preferred_attendant_phone?.message}
                  inputProps={{ 'data-testid': 'preferred_attendant_phone_input' }}
                />
                <TextField
                  label="Blood Donor Name"
                  id="outlined-size-small"
                  placeholder="Blood Donor Name"
                  type="text"
                  {...register('blood_donor_name')}
                  required
                  helperText={errors?.blood_donor_name?.message}
                  error={!!errors?.blood_donor_name?.message}
                  inputProps={{ 'data-testid': 'blood_donor_name_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Blood Donor Phone"
                  id="outlined-size-small"
                  placeholder="Blood Donor Phone"
                  type="number"
                  // size="small"
                  {...register('blood_donor_phone')}
                  required
                  helperText={errors?.blood_donor_phone?.message}
                  error={!!errors?.blood_donor_phone?.message}
                  inputProps={{ 'data-testid': 'blood_donor_phone_input' }}
                />
                <TextField
                  label="Emergency Decision Maker Name"
                  id="outlined-size-small"
                  placeholder="Emergency Decision Maker Name"
                  type="text"
                  {...register('emergency_decision_maker_name')}
                  required
                  helperText={errors?.emergency_decision_maker_name?.message}
                  error={!!errors?.emergency_decision_maker_name?.message}
                  inputProps={{ 'data-testid': 'emergency_decision_maker_name_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Emergency Decision Maker Phone"
                  id="outlined-size-small"
                  placeholder="Emergency Decision Maker Phone"
                  type="number"
                  // size="small"
                  {...register('emergency_decision_maker_phone')}
                  required
                  helperText={errors?.emergency_decision_maker_phone?.message}
                  error={!!errors?.emergency_decision_maker_phone?.message}
                  inputProps={{ 'data-testid': 'emergency_decision_maker_phone_input' }}
                />
                <TextField
                  label="Emergency CS Plan"
                  id="outlined-size-small"
                  placeholder="Emergency CS Plan"
                  type="text"
                  {...register('emergency_cs_plan')}
                  required
                  helperText={errors?.emergency_cs_plan?.message}
                  error={!!errors?.emergency_cs_plan?.message}
                  inputProps={{ 'data-testid': 'emergency_cs_plan_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Savings Plan"
                  id="outlined-size-small"
                  placeholder="Savings Plan"
                  type="text"
                  // size="small"
                  {...register('savings_plan')}
                  required
                  helperText={errors?.savings_plan?.message}
                  error={!!errors?.savings_plan?.message}
                  inputProps={{ 'data-testid': 'savings_plan_input' }}
                />
                <TextField
                  label="Delivery Bag"
                  id="outlined-size-small"
                  placeholder="Delivery Bag"
                  type="text"
                  {...register('delivery_bag')}
                  required
                  helperText={errors?.delivery_bag?.message}
                  error={!!errors?.delivery_bag?.message}
                  inputProps={{ 'data-testid': 'delivery_bag_input' }}
                />
              </div>
            </Box>
            <CardActions>
              <Button
                variant="contained"
                color="success"
                type="submit"
                startIcon={<Add />}
                disabled={isLoading}
                data-testId="submit_button">
                {isLoading ? 'Adding...' : 'Add'}
              </Button>
              <Button variant="contained" color="error" onClick={handleToggle}>
                {' '}
                Cancel{' '}
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </CenterComponent>
  )
}

export default AddBirthPlanComponent
