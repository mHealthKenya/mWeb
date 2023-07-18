import { Grid } from '@mui/material'
import React, { FC } from 'react'

const CenterComponent: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}>
      <Grid item xs={3}>
        {children}
      </Grid>
    </Grid>
  )
}

export default CenterComponent
