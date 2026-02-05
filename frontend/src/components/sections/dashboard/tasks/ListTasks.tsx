import {  List,  SelectChangeEvent } from '@mui/material';
import ListTaskItem from './ListTaskItem';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getMyTasks } from 'store/taskActions';

const ListTasks = () => {

    const dispatch  = useAppDispatch();
    
    useEffect(() => {
        dispatch( getMyTasks() );
    }, [ dispatch ] );

    const events = useAppSelector((state) => state.tasks.tasks);
    
    return (
    
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {events.map( ( event : any) => {
            
            return (
                <ListTaskItem key={event.id} {...event}/>
            );
        })}
    </List>
  );
}

export default ListTasks;