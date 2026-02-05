import { useState } from 'react';
import { Button } from '@mui/material'
import ModalCreateTask from './ModalCreateTask'
import IconifyIcon from 'components/base/IconifyIcon';

const CreateTask = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button variant="contained" onClick={ () => setOpen(true) } > 
                <IconifyIcon icon="mdi:plus" />
                Crear Tarea
            </Button>
            <ModalCreateTask open={open} handleClose={() => setOpen(false)} />
        </div>
    )
}

export default CreateTask
