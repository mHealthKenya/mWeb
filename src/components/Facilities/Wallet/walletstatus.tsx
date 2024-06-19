import CenterComponent from '@components/Shared/Center'
import { WalletByUserID } from '@models/wallet'
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

export const WalletStatusComponent: FC<{
  handleToggle: () => void
  status: WalletByUserID[]
}> = ({ handleToggle, status }) => {
  return (
    <CenterComponent>
      <Card sx={{ minWidth: 400, mt: 3, mb: 3 }}>
        <CardHeader title={'My Wallet Status'} />
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
                  <TableCell style={{ fontWeight: 'bold' }}>Balance:</TableCell>
                  <TableCell style={{ backgroundColor: '#e0f2f1' }}>
                    {status.map((wallet) => (
                      <div key={wallet.id}>
                        Ksh: {wallet.balance}
                        <span
                          style={{
                            display: 'inline-block',
                            width: '80px',
                            textAlign: 'right'
                          }}></span>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Amount Due:</TableCell>
                  <TableCell style={{ backgroundColor: '#e0f2f1' }}>
                    Ksh:{' '}
                    <span
                      style={{ display: 'inline-block', width: '80px', textAlign: 'right' }}></span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Redeemed Requests:</TableCell>
                  <TableCell>
                    <span
                      style={{ display: 'inline-block', width: '80px', textAlign: 'right' }}></span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Pending Requests:</TableCell>
                  <TableCell>
                    <span
                      style={{ display: 'inline-block', width: '80px', textAlign: 'right' }}></span>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
          <CardActionArea>
            <br />
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
