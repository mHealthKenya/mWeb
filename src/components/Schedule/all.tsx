import { Box, Button, List, ListSubheader } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { FC, useMemo, useState } from "react";
import useAllSchedules from "@services/schedules/allschedules";
import { Col } from "@data/users-by-role";

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

const AllSchedulesComponent: FC = (data: any) => {
  const [open, setOpen] = useState(false);
  const schedules: any = useAllSchedules(data);

  const handleToggle = () => {
    setOpen((open) => !open);
  };

  const rows = useMemo(() => {
    if (schedules && schedules.data) {
      return schedules.data.map((schedule: any) => ({
        id: schedule.id,
        title: schedule.title,
        facilityId: schedule.facilityId,
        motherId: schedule.motherId,
        status: schedule.status,
        date: schedule.date,
      }));
    }
    return [];
  }, [schedules.data]);

  const columns: GridColDef[] = useMemo(() => {
    return scheduleColumn.map(col => ({
      field: col.field,
      headerName: col.headerName,
      flex: 1,
    }));
  }, []);

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
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
      {/* SharedModal and other components */}
    </>
  );
};

export default AllSchedulesComponent;
