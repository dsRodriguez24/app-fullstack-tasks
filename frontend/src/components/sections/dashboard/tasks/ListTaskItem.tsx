import { MenuItem, FormControl, Select, SelectChangeEvent, Typography, Box } from '@mui/material';
import { ListItem, ListItemButton, ListItemText, ListItemAvatar } from '@mui/material';
import { handleUpdateTask } from 'api/task';
import IconifyIcon from 'components/base/IconifyIcon';
import { toastSw2 } from 'helpers/toastSw2';
import { Task } from 'interfaces/propsTaskItem.interface';
import React from 'react';
import { useAppDispatch } from 'store/hooks';
import { getMyTasks } from 'store/taskActions';

const ListTaskItem = ({ id, title, extendedProps, end }: Task) => {
  const { status: statusTask }  = extendedProps;
  const [status, setStatus]     = React.useState<string>(statusTask || 'pending');

    const dispatch  = useAppDispatch();
    
    React.useEffect(() => {
        setStatus(statusTask || 'pending');
    }, [] );

    const handleChange = async (event: SelectChangeEvent<string>) => {
        setStatus(event.target.value as string);
        const data = {
            id,
            status: event.target.value
        };
        
        const updateTask = await handleUpdateTask(data);
        updateTask.id ? toastSw2("Tarea actualizada", "La tarea se ha actualizado correctamente", "success") : toastSw2("Error", "Ha ocurrido un error al actualizar la tarea", "error");

        dispatch( getMyTasks() );
    };

  return (
    <ListItem
      key={id}
      divider
      disablePadding // Quitamos el padding por defecto para manejarlo en el Button
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Vertical en móvil, horizontal en SM+
        alignItems: { xs: 'flex-start', sm: 'center' },
        py: { xs: 2, sm: 1 },
      }}
    >
      <ListItemButton
        sx={{
          flexGrow: 1,
          width: '100%',
          pr: { xs: 2, sm: 16 }, // Reducimos el padding exagerado en móvil
          '&:hover': {
            backgroundColor: 'transparent',
            cursor: 'default',
            color: 'text.primary',
          },
        }}
      >
        <ListItemAvatar>
          <IconifyIcon icon="mdi:calendar-task" sx={{ fontSize: 24 }} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="subtitle1" fontWeight="bold">{title}</Typography>}
          secondary={
            <Typography variant="body2" color="text.secondary">
              Finaliza el: {end}
            </Typography>
          }
        />
      </ListItemButton>

      {/* Selector de estado responsive */}
      <Box
        sx={{
          width: { xs: '100%', sm: 'auto' },
          pl: { xs: 9, sm: 0 }, // Alineamos con el texto en móvil (saltando el avatar)
          pr: 2,
          pb: { xs: 1, sm: 0 },
        }}
      >
        <FormControl variant="outlined" size="small" fullWidth sx={{ minWidth: 140 }}>
          <Select
            value={status}
            onChange={handleChange}
            sx={{ 
                fontSize: '0.8125rem',
                bgcolor: 'background.paper',
                borderRadius: 2
            }}
          >
            <MenuItem value="pending">Pendiente</MenuItem>
            <MenuItem value="in_progress">En ejecución</MenuItem>
            <MenuItem value="done">Finalizada</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ListItem>
  );
};

export default ListTaskItem;