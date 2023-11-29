import { yupResolver } from '@hookform/resolvers/yup'
import { BirthPlan } from '@models/birthplan'
import { Facility } from '@models/facility'
import { User } from '@models/user'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  TextFieldProps
} from '@mui/material'
import useAddBirthPlan from '@services/birthplan/add-or-edit'
import useBirthPlan from '@services/birthplan/get-by-mother.dto'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface FormProps {
  delivery_mode: string
  preferred_transport: string
  support_person_name: string
  support_person_phone: string
  other_facility: string
  preferred_attendant_name: string | null | undefined
  preferred_attendant_phone: string | null | undefined
  blood_donor_name: string | null | undefined
  blood_donor_phone: string | null | undefined
  emergency_decision_maker_name: string
  emergency_decision_maker_phone: string
  emergency_cs_plan: string | null | undefined
  savings_plan: string
  delivery_bag: string
}

const delivery_modes = [
  'Skilled Virginal Delivery',
  'Cesarean Section',
  'Assisted Vaginal Delivery',
  'VBAC (Vaginal Birth After Cesarean)'
]

const delivery_bag_options = ['Patient Has One', 'Patient Has None']

const formSchema = Yup.object().shape({
  delivery_mode: Yup.string().required('A delivery mode is required'),
  preferred_transport: Yup.string().required('Preferred transport mode is required'),
  support_person_name: Yup.string().required('Birth companion name is required'),
  support_person_phone: Yup.string()
    .required('Please provide contacts for a birth companion')
    .matches(/^254\d{9}$/, 'Invalid phone number format. Use 254*********'),
  other_facility: Yup.string().required('Please select an alternative facility'),
  preferred_attendant_name: Yup.string().nullable().optional(),
  preferred_attendant_phone: Yup.string().nullable().optional(),

  blood_donor_name: Yup.string().nullable().optional(),
  blood_donor_phone: Yup.string().nullable().optional(),
  emergency_decision_maker_name: Yup.string().required('Emergency decision maker name is required'),
  emergency_decision_maker_phone: Yup.string()
    .required('Please provide contacts for an emergency decision maker')
    .matches(/^254\d{9}$/, 'Invalid phone number format. Use 254*********'),
  emergency_cs_plan: Yup.string().nullable().optional(),
  savings_plan: Yup.string().required('Provide a brief description of your savings plan'),
  delivery_bag: Yup.string().required('Select whether patient has delivery bag')
})

const AddBirthPlanComponent: FC<{
  birthPlan?: BirthPlan
  facilities: Facility[]
  user?: User
  facilityId: string
}> = ({ birthPlan, user, facilityId }) => {
  const textFieldProps: TextFieldProps = {
    size: 'small',
    fullWidth: true
  }
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur'
  })

  const { data: plan } = useBirthPlan(birthPlan, user?.id)

  const { mutate, isLoading } = useAddBirthPlan()

  const onSubmit = (data: FormProps) => {
    mutate({
      ...data,
      motherId: user?.id || '',
      facilityId,
      delivery_bag: data?.delivery_bag === 'Patient Has One'
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title={`${user?.f_name} ${user?.l_name} `} />
        <CardContent>
          <Stack spacing={2}>
            <FormControl fullWidth size="small" required>
              <InputLabel id="demo-simple-select-label" required>
                Delivery Mode
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Delivery Mode"
                size="small"
                defaultValue={plan?.delivery_mode}
                {...register('delivery_mode')}
                error={!!errors.delivery_mode?.message}
                inputProps={{ 'data-testid': 'role_input' }}
                required>
                {delivery_modes.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {errors?.delivery_mode?.message}
              </FormHelperText>
            </FormControl>
            <TextField
              {...textFieldProps}
              {...register('preferred_transport')}
              error={!!errors.preferred_transport?.message}
              helperText={errors.preferred_transport?.message}
              label="Preferred Transport"
              required
              defaultValue={plan?.preferred_transport}
            />
            <TextField
              {...textFieldProps}
              {...register('support_person_name')}
              error={!!errors.support_person_name?.message}
              helperText={errors.support_person_name?.message}
              label="Birth Companion Name"
              required
              defaultValue={plan?.support_person_name}
            />
            <TextField
              {...textFieldProps}
              {...register('support_person_phone')}
              error={!!errors.support_person_phone?.message}
              helperText={errors.support_person_phone?.message}
              label="Birth Companion Phone"
              required
              defaultValue={plan?.support_person_phone}
            />
            <TextField
              {...textFieldProps}
              {...register('preferred_attendant_name')}
              error={!!errors.preferred_attendant_name?.message}
              helperText={errors.preferred_attendant_name?.message}
              label="Preferred Attendant Name"
              defaultValue={plan?.preferred_attendant_name}
            />
            <TextField
              {...textFieldProps}
              {...register('preferred_attendant_phone')}
              error={!!errors.preferred_attendant_phone?.message}
              helperText={errors.preferred_attendant_phone?.message}
              label="Preferred Attendant Phone"
              defaultValue={plan?.preferred_attendant_phone}
            />
            <TextField
              {...textFieldProps}
              {...register('blood_donor_name')}
              error={!!errors.blood_donor_name?.message}
              helperText={errors.blood_donor_name?.message}
              label="Blood Donor Name"
              defaultValue={plan?.blood_donor_name}
            />
            <TextField
              {...textFieldProps}
              {...register('blood_donor_phone')}
              error={!!errors.blood_donor_phone?.message}
              helperText={errors.blood_donor_phone?.message}
              label="Blood Donor Phone"
              defaultValue={plan?.blood_donor_phone}
            />
            <TextField
              {...textFieldProps}
              {...register('emergency_decision_maker_name')}
              error={!!errors.emergency_decision_maker_name?.message}
              helperText={errors.emergency_decision_maker_name?.message}
              label="Emergency Decision Maker Name"
              required
              defaultValue={plan?.emergency_decision_maker_name}
            />
            <TextField
              {...textFieldProps}
              {...register('emergency_decision_maker_phone')}
              error={!!errors.emergency_decision_maker_phone?.message}
              helperText={errors.emergency_decision_maker_phone?.message}
              label="Emergency Decision Maker Phone"
              required
              defaultValue={plan?.emergency_decision_maker_phone}
            />
            <TextField
              {...textFieldProps}
              {...register('emergency_cs_plan')}
              error={!!errors.emergency_cs_plan?.message}
              helperText={errors.emergency_cs_plan?.message}
              label="Emergency CS Plan"
              multiline
              rows={4}
              defaultValue={plan?.emergency_cs_plan}
            />

            <TextField
              {...textFieldProps}
              {...register('savings_plan')}
              error={!!errors.savings_plan?.message}
              helperText={errors.savings_plan?.message}
              label="Savings Plan"
              multiline
              rows={4}
              required
              defaultValue={plan?.savings_plan}
            />
            <Controller
              name="delivery_bag"
              control={control}
              defaultValue={plan?.delivery_bag ? 'Patient Has One' : 'Patient Has None'}
              render={({ field }) => (
                <>
                  <FormLabel required error={!!errors?.delivery_bag?.message}>
                    Delivery Bag
                  </FormLabel>
                  <RadioGroup {...field} row>
                    {delivery_bag_options.map((item, index) => (
                      <FormControlLabel value={item} control={<Radio />} label={item} key={index} />
                    ))}
                  </RadioGroup>
                </>
              )}
            />

            <TextField
              {...textFieldProps}
              {...register('other_facility')}
              error={!!errors.other_facility?.message}
              helperText={errors.other_facility?.message}
              label="Alternative Facility"
              required
              defaultValue={plan?.savings_plan}
            />
            {/* <FormControl fullWidth size="small">
              <InputLabel id="facility">Alternative Facility</InputLabel>
              <Select
                labelId="facility-label"
                id="facility"
                label="Alternative Facility"
                {...register('alternative_facility_id')}
                error={!!errors?.alternative_facility_id?.message}
                defaultValue={plan?.alternative_facility_id}
                inputProps={{ 'data-testid': 'facility_input' }}>
                {facilities.map((facility) => (
                  <MenuItem value={facility.id} key={facility.id}>
                    {facility.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors?.alternative_facility_id?.message}</FormHelperText>
            </FormControl> */}
          </Stack>
        </CardContent>
        <CardActionArea>
          <CardActions>
            <Button variant="contained" color="success" type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting' : 'Submit'}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </form>
  )
}

export default AddBirthPlanComponent
