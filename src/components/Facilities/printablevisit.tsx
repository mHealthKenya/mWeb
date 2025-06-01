import { ClinicalVisit } from '@models/clinicvisits'
import {
  CalendarMonth,
  Call,
  HealthAndSafety,
  Height,
  Numbers,
  RadioButtonChecked
} from '@mui/icons-material'
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
import dayjs from 'dayjs'
import { FC } from 'react'

const PrintableVisit: FC<{ visit: ClinicalVisit; title: string; subHeader: string }> = ({
  visit,
  title,
  subHeader
}) => {
  return (
    <div>
      {' '}
      <CardHeader title={title} subheader={subHeader} />
      <Divider>Bio Data</Divider>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Call />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone Number"
                    secondary={visit.bioData.user.phone_number}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Numbers />
                  </ListItemIcon>
                  <ListItemText primary="Age" secondary={visit.bioData.age} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Numbers />
                  </ListItemIcon>
                  <ListItemText
                    primary="Prev Pregnancies"
                    secondary={visit.bioData.previous_pregnancies}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Height />
                  </ListItemIcon>
                  <ListItemText primary="Height" secondary={visit.bioData.height} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <RadioButtonChecked />
                  </ListItemIcon>
                  <ListItemText
                    primary="LMP"
                    secondary={dayjs(new Date(visit.bioData.last_monthly_period)).format(
                      'YYYY-MM-DD HH:mm'
                    )}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonth />
                  </ListItemIcon>
                  <ListItemText
                    primary="EDD"
                    secondary={dayjs(new Date(visit.bioData.expected_delivery_date)).format(
                      'YYYY-MM-DD HH:mm'
                    )}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Divider>Visit Details</Divider>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Numbers />
                  </ListItemIcon>
                  <ListItemText primary="Weight" secondary={visit.weight} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="HIV Status" secondary={visit.hiv} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="HB Level" secondary={visit.rhesusFactor} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="TB" secondary={visit.TB} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="Tetanus" secondary={visit.tetanus} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="Hepatitis" secondary={visit.hepatitisB} />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="Rhesus Factor" secondary={visit.rhesusFactor} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="Blood Group" secondary={visit.bloodGroup} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="VDRL" secondary={visit.vdrl} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HealthAndSafety />
                  </ListItemIcon>
                  <ListItemText primary="Blood RBS" secondary={visit.bloodRBS} />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HealthAndSafety />
              </ListItemIcon>
              <ListItemText primary="Urinalysis" secondary={visit.urinalysis} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HealthAndSafety />
              </ListItemIcon>
              <ListItemText primary="Treatment" secondary={visit.treatment} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HealthAndSafety />
              </ListItemIcon>
              <ListItemText primary="Notes" secondary={visit.notes} />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </div>
  )
}

export default PrintableVisit
