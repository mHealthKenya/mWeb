import CenterComponent from '@components/Shared/Center'
import { Target } from '@models/target'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React, { FC } from 'react'

export const ViewTargetComponent: FC<{
  handleToggle: () => void
  target: Target,
}> = ({ handleToggle, target }) => {
  return (
    <CenterComponent>
      <Card sx={{ minWidth: 400, mt: 3, mb: 3 }}>
        <CardHeader title={'My Target'} />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Feild</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Set Target</TableCell>
                  <TableCell>{target?.setTarget}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Current</TableCell>
                  <TableCell>{target?.current}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <CardActionArea>
            <CardActions>
              <Button variant="contained" color="error" size="small" onClick={handleToggle}>
                Close
              </Button>
            </CardActions>
          </CardActionArea>
        </CardContent>
      </Card>
    </CenterComponent>
  )
}
