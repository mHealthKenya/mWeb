import React, { FC } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardContent,
  Stack,
  CardHeader,
  Box,
} from '@mui/material';
import { UserBioData } from '@models/bio-data';
import CenterComponent from '@components/Shared/Center';
import { Edit } from '@mui/icons-material';
// import useUserById from '@services/users/biodata';

interface ViewBioDataComponentProps {
  bio: UserBioData | any;
  handleToggle: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(date);

  return formattedDate;
};

const ViewBioDataComponent: FC<ViewBioDataComponentProps> = ({
  bio,
  handleToggle
}) => {
  return (
    <CenterComponent>
      <Card>
      <CardHeader title={`${bio.user.f_name} - Bio Data`} />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Height</TableCell>
                  <TableCell>{bio.height}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Weight</TableCell>
                  <TableCell>{bio.weight}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Age</TableCell>
                  <TableCell>{bio.age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Monthly Period</TableCell>
                  <TableCell>{formatDate(bio.last_monthly_period)} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expected Delivery Date</TableCell>
                  <TableCell>{formatDate(bio.expected_delivery_date)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pregnancy Period</TableCell>
                  <TableCell>{bio.pregnancy_period}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Clinic Visit</TableCell>
                  <TableCell>{formatDate(bio.last_clinic_visit)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Previous Pregancies</TableCell>
                  <TableCell>{bio.previous_pregnancies}</TableCell>
                </TableRow>
                {/* Add more rows for other fields */}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="flex-end" mt={2}>
            <Box
              sx={{
                display: 'flex',
                '& > *': {
                  marginRight: '10px',
                },
              }}
            >
              <Button variant="contained" color="error" onClick={handleToggle}>
                Close
              </Button>

              <Button
                variant="contained"
                color="info"
                startIcon={<Edit />}
                size="small"
                // onClick={() => handleEdit(params.value)}
              >
                Edit
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </CenterComponent>
  );
};

export default ViewBioDataComponent;
