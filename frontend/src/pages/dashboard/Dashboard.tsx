import { Grid } from '@mui/material';
import Tasks from 'components/sections/dashboard/tasks/Tasks';

export const Dashboard = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} xl={7}>
        <Tasks />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
