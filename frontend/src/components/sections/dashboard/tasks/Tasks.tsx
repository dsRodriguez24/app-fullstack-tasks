import { Divider, Paper } from '@mui/material';
import TabsTasks from './TabsTasks';
import CreateTask from './CreateTask';

const Tasks = () => {
  return (
    <Paper sx={{ pt: 2.875, pb: 4, px: 4 }}>
      <CreateTask/>
      {/* <Divider sx={{ my:2 }}/> */}
      <TabsTasks/>  
    </Paper>
  );
};

export default Tasks;
