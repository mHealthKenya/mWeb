import { ClinicalVisit } from '@models/clinicvisits'
import { LocalHospital, Wallet } from '@mui/icons-material'
import {
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { CalendarIcon } from '@mui/x-date-pickers'
// import dayjs from 'dayjs'
import { FC } from 'react'

const TransactionComponent: FC<{ visit: ClinicalVisit; title: string; subHeader: string }> = ({
  // visit,
  title,
  subHeader
}) => {
  return (
    <div>
      {' '}
      <CardHeader title={title} subheader={subHeader} />
      <CardContent>
        <Divider>Transaction Details</Divider>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Wallet />
                  </ListItemIcon>
                  <ListItemText
                    primary="Opening Balance"
                    // secondary={visit.weight}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Wallet />
                  </ListItemIcon>
                  <ListItemText
                    primary="Charge"
                    // secondary={visit.hiv}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Wallet />
                  </ListItemIcon>
                  <ListItemText
                    primary="Closing Balance"
                    // secondary={visit.rhesusFactor}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Wallet />
                  </ListItemIcon>
                  <ListItemText
                    primary="Invoice No."
                    // secondary={visit.tetanus}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date"
                    // secondary={visit.TB}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Wallet />
                  </ListItemIcon>
                  <ListItemText
                    primary="Status"
                    // secondary={visit.tetanus}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocalHospital />
                  </ListItemIcon>
                  <ListItemText
                    primary="Services"
                    // secondary={visit.hepatitisB}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  )
}

export default TransactionComponent
