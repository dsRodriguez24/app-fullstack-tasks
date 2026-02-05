import { EventDragStopArg } from "@fullcalendar/interaction/index.js"
import { handleUpdateTask } from "api/task"

// interface EventClickArg {
//     el: HTMLElement
//     event: EventApi
//     jsEvent: MouseEvent
//     view: ViewApi
// }



export const handleEventClick = (info: any) => {
    const event = info.event
}


export const handleEventDrop = async (info: EventDragStopArg) => {
    const newStatus = info.event.getResources()[0].id
    const newDate   = info.event.startStr;
    const id        = info.event.id;
    

    const data = {
        id,
        status: newStatus,
        completion_at: `${newDate.split('T')[0] } ${newDate.split('T')[1] }`,
        // date_end: newDate.split('T')[0]
    };

    const updateTask = await handleUpdateTask(data);
    if (updateTask.id) {
        return true;
    }
    return false;
}