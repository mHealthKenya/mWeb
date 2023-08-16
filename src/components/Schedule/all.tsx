import { Box, Button, List, ListSubheader } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { FC, useMemo, useState } from "react";
import useAllSchedules, { formatDateTime } from "@services/schedules/allschedules";
import { Col } from "@data/users-by-role";
import { Delete, Edit } from "@mui/icons-material";
import SharedModal from "@components/Shared/Modal";
import useAllFacilities from "@services/locations/all";
import AddSchedule from "@components/Schedule/add";
import EditScheduleComponent from "./Edit";
import AddSchedule1 from "./AddSchedule";
import { UserByRole } from "@models/user-by-role";
import AddScheduleComponent from "@components/Schedule/add";

export const scheduleColumn: Col[] = [
  {
    field: 'title',
    headerName: 'Title'
  },
  {
    field: 'facilityId',
    headerName: 'Facility'
  },
  {
    field: 'motherId',
    headerName: 'Mother'
  },
  {
    field: 'status',
    headerName: 'Status'
  },
  {
    field: 'date',
    headerName: 'Date'
  },
];

const AllSchedulesComponent: FC<{mothers: UserByRole[], facilityAdmin: UserByRole, data: any}> = ({mothers,  facilityAdmin, data}) => {
  
  // const [open, setOpen] = useState(false);
  const [addTg, setAddTg] = useState(false)
  const [editTg, setEditTg] = useState(false)
  const [open, setOpen] = useState(false)
  const schedules: any = useAllSchedules(data);

  const handleEdit = () => {
    setEditTg((editTg) => !editTg)
  }

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  const handleAdd = () => {
    // setAddTg((addTg) => !addTg)
    setOpen((open) => !open)
  }

  const rows = useMemo(() => {
    if (schedules && schedules.data) {
      return schedules.data.map((schedule: any) => ({
        id: schedule.id,
        title: schedule.title,
        facilityId: schedule.facilityId,
        motherId: schedule.motherId,
        status: schedule.status,
        date: formatDateTime(schedule.date),
      }));
    }
    return [];
  }, [schedules.data]);

  const columns: GridColDef[] = useMemo(() => {
    const actionCol: GridColDef = {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'flex'
            }}>
            <Button
              variant="contained"
              color="info"
              sx={{ mr: 1 }}
              startIcon={<Edit />}
              size="small"
              onClick={() => handleToggle()}>
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => console.log(params.value)}
              startIcon={<Delete />}
              size="small">
              Delete
            </Button>
          </Box>
        )
      }
    }
    return [...scheduleColumn.map(col => ({
      field: col.field,
      headerName: col.headerName,
      flex: 1,
    })), actionCol];
  }, []);

  

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <Button onClick={() => handleToggle()}>Create a Schedule</Button>
      <DataGrid
          rows={rows}
          slots={{ toolbar: GridToolbar }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          density="comfortable"
        />
      </Box>
      <SharedModal items={{open, handleToggle}}>
        <AddScheduleComponent mothers={mothers} facilityID={facilityAdmin.facilityId || ''} handleToggle={handleToggle}/>
        {/* <EditScheduleComponent facilities={facilities} mothers={mothers} /> */}
      </SharedModal>
      
    </>
  );
};

export default AllSchedulesComponent;
