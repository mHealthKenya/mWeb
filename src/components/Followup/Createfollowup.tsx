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

interface FollowUpData {
  scheduleId: string,
  chvId: string
}

const schema = Yup.object().shape({
  scheduleId: Yup.string().required('Schedule is required'),
  chvId: Yup.string().required('CHV is required')
})

const CreateFollowUpComponent : FC<{
   followUpCreate: FollowUp | undefined
   handleToggle: () => void;
   schedule?: Schedule
   chv: UserByRole | undefined
   }> = ({
    handleToggle,
    followUpCreate,
    schedule,
    chv
}) => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FollowUpData>({
    resolver: yupResolver(schema)
  })

  console.log("errors", errors)

  console.log("data", chv)



  const { mutate, isLoading } = useFollowUp(reset)

  const onSubmit = (data: FollowUpData) => {
    mutate({
      // scheduleId: followUpCreate?.scheduleId,
      ...data
    })
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
        id="outlined-multiline-static"
        label="CHV"
        multiline
        defaultValue={chv?.id}        
        disabled
      />
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