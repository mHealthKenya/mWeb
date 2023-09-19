import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserByRole } from '@models/user-by-role'
import { Update } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import useUpdateBirthPlan from '@services/birthplan/update_birth_Plan'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface UpdateBirthPlanProps {
  alternative_facility_id: string
  delivery_mode: string
  support_person_name: string
  support_person_phone: string
  preferred_transport: string
  preferred_attendant_name: string
  preferred_attendant_phone: string
  blood_donor_name: string
  blood_donor_phone: string
  emergency_decision_maker_phone: string
  emergency_decision_maker_name: string
  delivery_bag: boolean
  emergency_cs_plan: string
  savings_plan: string
}

const birthPlanUpdateSchema = Yup.object().shape({
  alternative_facility_id: Yup.string().optional(),
  delivery_mode: Yup.string().required(),
  support_person_name: Yup.string().optional(),
  support_person_phone: Yup.string().optional(),
  preferred_transport: Yup.string().required(),
  preferred_attendant_name: Yup.string().optional(),
  preferred_attendant_phone: Yup.string().optional(),
  blood_donor_name: Yup.string().optional(),
  blood_donor_phone: Yup.string().optional(),
  emergency_decision_maker_phone: Yup.string().optional(),
  emergency_decision_maker_name: Yup.string().optional(),
  delivery_bag: Yup.boolean().required(),
  emergency_cs_plan: Yup.string().optional(),
  savings_plan: Yup.string().optional()
})

export const UpdateBirthPlanComponent: FC<{
  handleToggle: () => void
  birthPlanUpdate: UserByRole | undefined
}> = ({ handleToggle, birthPlanUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
    // reset
  } = useForm<UpdateBirthPlanProps>({
    resolver: yupResolver(birthPlanUpdateSchema)
  })

  const { mutate, isLoading } = useUpdateBirthPlan(handleToggle)

  const onSubmit = (data: UpdateBirthPlanProps) => {
    mutate({
      id: birthPlanUpdate?.BirthPlan[0].id || '',
      ...data
    })
  }

  return (
    <CenterComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ minWidth: 700 }}>
          <CardHeader title={`Update Birth Plan`} />
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
                  label="Alternative Facility"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].alternative_facility_id}
                  {...register('alternative_facility_id')}
                  helperText={errors?.alternative_facility_id?.message}
                  error={!!errors?.alternative_facility_id?.message}
                  inputProps={{ 'data-testid': 'alternative_facility_id_input' }}
                />
                <TextField
                  label="Delivery Mode"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].delivery_mode}
                  {...register('delivery_mode')}
                  helperText={errors.delivery_mode?.message}
                  error={!!errors.delivery_mode?.message!}
                  inputProps={{ 'data-testid': 'delivery_mode_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Support Person Name"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].support_person_name}
                  {...register('support_person_name')}
                  helperText={errors.support_person_name?.message}
                  error={!!errors.support_person_name?.message}
                  inputProps={{ 'data-testid': 'support_person_name_input' }}
                />
                <TextField
                  label="Support Person Phone"
                  type="number"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].support_person_phone}
                  {...register('support_person_name')}
                  helperText={errors.support_person_phone?.message}
                  error={!!errors.support_person_phone?.message!}
                  inputProps={{ 'data-testid': 'support_person_phone_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Preffered Transport"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].preferred_transport}
                  {...register('preferred_transport')}
                  helperText={errors.preferred_transport?.message}
                  error={!!errors.preferred_transport?.message}
                  inputProps={{ 'data-testid': 'preferred_transport_input' }}
                />
                <TextField
                  label="Preffered Attendant Name"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].preferred_attendant_name}
                  {...register('preferred_attendant_name')}
                  helperText={errors.preferred_attendant_name?.message}
                  error={!!errors.preferred_attendant_name?.message}
                  inputProps={{ 'data-testid': 'preferred_attendant_name_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Preffered Attendant Phone"
                  type="number"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].preferred_attendant_phone}
                  {...register('preferred_attendant_phone')}
                  helperText={errors.preferred_attendant_phone?.message}
                  error={!!errors.preferred_attendant_phone?.message}
                  inputProps={{ 'data-testid': 'preferred_attendant_phone_input' }}
                />
                <TextField
                  label="Blood Donor Name"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].blood_donor_name}
                  {...register('blood_donor_name')}
                  helperText={errors.blood_donor_name?.message}
                  error={!!errors.blood_donor_name?.message}
                  inputProps={{ 'data-testid': 'blood_donor_name_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Blood Donor Phone"
                  type="number"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].blood_donor_phone}
                  {...register('blood_donor_phone')}
                  helperText={errors.blood_donor_phone?.message}
                  error={!!errors.blood_donor_phone?.message}
                  inputProps={{ 'data-testid': 'blood_donor_phone_input' }}
                />
                <TextField
                  label="Emergency Decision Maker Phone"
                  type="number"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].emergency_decision_maker_phone}
                  {...register('emergency_decision_maker_phone')}
                  helperText={errors.emergency_decision_maker_phone?.message}
                  error={!!errors.emergency_decision_maker_phone?.message}
                  inputProps={{ 'data-testid': 'emergency_decision_maker_phone_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Emergency Decision Maker Name"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].emergency_decision_maker_phone}
                  {...register('emergency_decision_maker_name')}
                  helperText={errors.emergency_decision_maker_name?.message}
                  error={!!errors.emergency_decision_maker_name?.message}
                  inputProps={{ 'data-testid': 'emergency_decision_maker_name_input' }}
                />
                <TextField
                  label="Delivery Bag"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].delivery_bag}
                  {...register('delivery_bag')}
                  helperText={errors.delivery_bag?.message}
                  error={!!errors.delivery_bag?.message}
                  inputProps={{ 'data-testid': 'delivery_bag_input' }}
                />
              </div>
              <div>
                <TextField
                  label="Emergency CS Plan"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].emergency_cs_plan}
                  {...register('emergency_cs_plan')}
                  helperText={errors.emergency_cs_plan?.message}
                  error={!!errors.emergency_cs_plan?.message}
                  inputProps={{ 'data-testid': 'emergency_cs_plan_input' }}
                />
                <TextField
                  label="Savings Plan"
                  type="text"
                  defaultValue={birthPlanUpdate?.BirthPlan[0].savings_plan}
                  {...register('savings_plan')}
                  helperText={errors.savings_plan?.message}
                  error={!!errors.savings_plan?.message}
                  inputProps={{ 'data-testid': 'savings_plan_input' }}
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
