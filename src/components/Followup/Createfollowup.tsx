import CenterComponent from '@components/Shared/Center'
import { yupResolver } from '@hookform/resolvers/yup'
import { FollowUp, Schedule } from '@models/followup'
import { UserByRole } from '@models/user-by-role'
import { FollowTheSignsOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import useFollowUp from '@services/followup/createfollowup'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface FollowUpProps {
  // description: string,
  // scheduleId: string,
  chvId: string
}

const schema = Yup.object().shape({
  // description: Yup.string().optional(),
// scheduleId: Yup.string().required('Schedule is required'),
  chvId: Yup.string().required('CHV is required')
})

const CreateFollowUpComponent : FC<{
   followUpCreate?: FollowUp
   schedule?: Schedule
   chv?: UserByRole
   handleToggle: () => void;
   }> = ({
    handleToggle,
    // followUpCreate,
    schedule,
    chv
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FollowUpProps>({
    resolver: yupResolver(schema)
  })

  console.log("errors", errors)

  // console.log("data", schedule)

  const { mutate, isLoading } = useFollowUp(reset)

  const onSubmit = (data: FollowUpProps) => {

    console.log("called",{...chv, chvId: chv?.id})

    const item = {
      ...data,
      chvId: chv?.id || '',
      scheduleId: schedule?.id || '',
    }
    mutate(item);
    handleToggle();
  }
  
  return (
    <CenterComponent>
       <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{minWidth: 700}}>
          <CardHeader title={`Follow up`} />
        <CardContent>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <div>
      <TextField
        id="outlined-multiline-static"
        label="Title"
        multiline
        defaultValue={schedule?.title}
        disabled
      />
       <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        defaultValue={schedule?.description}
        disabled
        rows={3}
      />
      </div>
      <div>
      <TextField
        id="outlined-multiline-static"
        label="Schedule"
        multiline
        defaultValue={schedule?.id}
        disabled
        // error={!!errors.scheduleId}
        // helperText={errors.scheduleId?.message}
        rows={3}
      />
      </div>
      <div>
      <TextField
          id="outlined-multiline-static"
          label="Date"
          multiline
          defaultValue="Default Value"
        /> 
             
      <TextField
        // id="outlined-multiline-static"
        label="CHV"
        // multiline
        defaultValue={chv?.id}
        {...register('chvId')}
        helperText={errors.chvId?.message}  
        error={!!errors.chvId?.message}   
        // disabled
        inputProps={{ 'data-testid': 'chvId_input' }}
      />

          {/* <FormControl fullWidth size="small" required>
              <InputLabel id="role">CHV</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="Role"
                {...register('chvId')}
                required
                error={!!errors?.chvId?.message}
                defaultValue={chv?.id}
                inputProps={{ 'data-testid': 'chvId_input' }}>
                {rolesChv.map((chvId, index) => (
                  <MenuItem value={chvId} key={index}>
                    {chvId}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors?.chvId?.message}</FormHelperText>
            </FormControl> */}

      </div>
      </Box>

      <CardActions>
        <Button
        variant="contained"
        color="success"
        type="submit"
        startIcon={<FollowTheSignsOutlined />}
        disabled={isLoading}
        data-testid="submit_button"
        >
            Follow Up
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


export default CreateFollowUpComponent