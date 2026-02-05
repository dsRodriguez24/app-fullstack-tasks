// * FULL CALENDAR
import FullCalendar from '@fullcalendar/react'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
// * FULL CALENDAR
import esLocale from '@fullcalendar/core/locales/es'

import { handleEventClick, handleEventDrop } from 'helpers/calendar'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useEffect } from 'react'
import { getMyTasks } from 'store/taskActions'
import { toastSw2 } from 'helpers/toastSw2'
import { useMediaQuery, useTheme, Box } from '@mui/material';

const Calendar = () => {

    const dispatch  = useAppDispatch();
    const theme     = useTheme();
    const isMobile  = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch( getMyTasks() );
    }, [ dispatch ])
    
    const resources = [
        { id: 'pending', title: 'Pendiente' },
        { id: 'in_progress', title: 'En ejecución' },
        { id: 'done', title: 'Finalizado' },
    ]

    const events = useAppSelector( ( state ) => state.tasks.tasks);
    
    const eventDrop = async (e : any) => {
        const update = await handleEventDrop(e);
        { update ? toastSw2("Tarea actualizada", "La tarea se ha actualizado correctamente", "success") : toastSw2("Error", "Ha ocurrido un error al actualizar la tarea", "error") }
        dispatch( getMyTasks() );
    }

    return (
        <>
            <Box sx={{ 
            p: { xs: 1, sm: 3 }, // Menos padding en móvil
            '& .fc': { fontSize: isMobile ? '0.75rem' : '1rem' } // Reducimos fuente en móvil
        }}>

            <FullCalendar
            plugins={ [ 
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                resourceTimeGridPlugin 
            ]}
            initialView={isMobile ? 'listWeek' : 'resourceTimeGridDay'}
            resources={ resources } 
            events={ events } 
            editable={ true } 
            eventDrop={ eventDrop } 
            eventClick={ handleEventClick }
            locale={ esLocale } 
            height="auto"
            headerToolbar={{
                left: isMobile ? 'prev,next' : 'prev,next today',
                center: 'title',
                right: isMobile ? '' : 'dayGridMonth,timeGridWeek,resourceTimeGridDay'
            }}
            // Otras opciones responsive
            handleWindowResize={true}
            stickyHeaderDates={true}
            // Mejorar visualización en móvil
            dayMaxEvents={isMobile ? 2 : true}

            />

        </Box>
        
        </>
    )
}

export default Calendar
