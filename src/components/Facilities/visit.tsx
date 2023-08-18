import CenterComponent from '@components/Shared/Center'
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
  Button,
  Card,
  CardActions,
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

const VisitComponent: FC<{ visit: ClinicalVisit; handleClose: () => void }> = ({
  visit,
  handleClose
}) => {
  const title = `Visit details for ${visit.mother.f_name} ${visit.mother.l_name}`
  const subHeader = `${dayjs(new Date(visit.createdAt)).format('YYYY-MM-DD HH:mm')}`
  return (
    <CenterComponent>
      <Card sx={{ minWidth: '680px', mt: 3, mb: 3 }}>
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
                    <ListItemText primary="Phone Number" secondary={visit.mother.phone_number} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Numbers />
                    </ListItemIcon>
                    <ListItemText primary="Age" secondary={visit.mother.BioData[0]?.age} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Numbers />
                    </ListItemIcon>
                    <ListItemText
                      primary="Prev Pregnancies"
                      secondary={visit.mother.BioData[0]?.previous_pregnancies}
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
                    <ListItemText primary="Height" secondary={visit.mother?.BioData[0]?.height} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <RadioButtonChecked />
                    </ListItemIcon>
                    <ListItemText
                      primary="LMP"
                      secondary={dayjs(
                        new Date(visit.mother?.BioData[0]?.last_monthly_period)
                      ).format('YYYY-MM-DD HH:mm')}
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
                      secondary={dayjs(
                        new Date(visit.mother?.BioData[0]?.expected_delivery_date)
                      ).format('YYYY-MM-DD HH:mm')}
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
                <ListItemText primary="Notes" secondary={visit.notes} />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            color="success"
            type="submit"
            data-testid="submit_button"
            onClick={handleClose}>
            Close
          </Button>
        </CardActions>
      </Card>
    </CenterComponent>
  )
}

export default VisitComponent
