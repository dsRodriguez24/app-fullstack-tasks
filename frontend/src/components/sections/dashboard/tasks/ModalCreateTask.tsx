// import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, Box, LinearProgress} from '@mui/material';
import { DialogTitle, TextField, useMediaQuery, useTheme, IconButton} from '@mui/material';
import { handleSaveTask } from 'api/task';
import { toastSw2 } from 'helpers/toastSw2';
import { validateNewTask, createTaskPayload } from 'helpers/newTasks';
import { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { getMyTasks } from 'store/taskActions';

const ModalCreateTask = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
  const dispatch    = useAppDispatch();
  const theme       = useTheme();
  const fullScreen  = useMediaQuery(theme.breakpoints.down('sm'));

  const [title, setTitle ]              = useState('');
  const [description, setDescription ]  = useState('');
  const [fecha, setFecha ]              = useState( new Date().toISOString().split('T')[0] );
  const [hora, setHora ]                = useState( '23:59' );

  const [savingTask, setSavingTask] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFecha('');
    setHora('23:59');
    setErrors({});
  }


  const handlerSubmitForm = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    // Validar campos obligatorios usando el helper
    const { valid, errors: validationErrors } = validateNewTask({ title, description, fecha, hora });
    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    setSavingTask(true);
    const payload = createTaskPayload({ title, description, fecha, hora });
    try {
      const responseTask = await handleSaveTask(payload);
      if (responseTask && responseTask.id) {
        toastSw2('Tarea creada', 'La tarea se ha creado correctamente', 'success');
        resetForm();
        handleClose();
        dispatch(getMyTasks());
        return;
      }
      toastSw2('Error', 'Ha ocurrido un error al crear la tarea', 'error');
    } catch (err) {
      toastSw2('Error', 'Ha ocurrido un error al crear la tarea', 'error');
    } finally {
      setSavingTask(false);
    }
  }
  

  return (
    <Dialog
      fullScreen={fullScreen} 
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="responsive-dialog-title" sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Crear Nueva Tarea
        {fullScreen && (
          <IconButton onClick={handleClose}>
            
          </IconButton>
        )}
      </DialogTitle>


      <form onSubmit={ handlerSubmitForm } >
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              autoFocus
              label="Título de la tarea"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={e => { setTitle(e.target.value); if (errors.title) setErrors(prev => { const { title, ...rest } = prev; return rest; }); }}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="Descripción"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={description}
              onChange={e => { setDescription(e.target.value); if (errors.description) setErrors(prev => { const { description, ...rest } = prev; return rest; }); }}
              error={!!errors.description}
              helperText={errors.description}
              />
            <TextField
              label="Fecha estimada de ejecucion"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fecha}
              onChange={e => { setFecha(e.target.value); if (errors.fecha) setErrors(prev => { const { fecha, ...rest } = prev; return rest; }); }}
              error={!!errors.fecha}
              helperText={errors.fecha}
            />
            <TextField
              label="Hora estimada de ejecucion"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={hora}
              onChange={e => { setHora(e.target.value); if (errors.hora) setErrors(prev => { const { hora, ...rest } = prev; return rest; }); }}
              error={!!errors.hora}
              helperText={errors.hora}
            />
          </Box>
        </DialogContent>

        {savingTask && (
            <LinearProgress />
        )}
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button  type="submit" disabled={savingTask} variant="contained" autoFocus>
            Guardar Tarea
          </Button>
        </DialogActions>

      </form>
    </Dialog>
  );
};

export default ModalCreateTask;