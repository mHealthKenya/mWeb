import CenterComponent from '@components/Shared/Center'
import { Schedule } from '@models/followup'
import { FollowTheSignsOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import React, { FC } from 'react'


const CreateFollowUpComponent : FC<{
  schedule: Schedule | undefined
   handleToggle: () => void
   }> = ({
    handleToggle,
    schedule
}) => {
  
  return (
    <CenterComponent>
        <form action="submit">
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
          label="Date"
          multiline
          defaultValue="Default Value"
        /> 
        
        <TextField
        id="outlined-multiline-static"
        label="CHV"
        multiline
        defaultValue="Default Value"
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
        // disabled={isLoading}
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