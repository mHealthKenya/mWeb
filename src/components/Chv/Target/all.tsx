import CenterComponent from '@components/Shared/Center'
import {
  Button,
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
import React from 'react'
import { Card } from 'react-bootstrap'

export const ViewTargetComponent = () => {
  return (
    <CenterComponent>
      <Card>
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
                  <TableCell>20</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Current</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <CardActionArea>
            <CardActions>
              <Button variant="contained" color="error" size="small">
                Close
              </Button>
            </CardActions>
          </CardActionArea>
        </CardContent>
      </Card>
    </CenterComponent>
  )
}
