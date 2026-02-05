// features/auth/authActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/axios';
import { setAllMyTasks } from './taskSlice';

export const getMyTasks = createAsyncThunk( 'task', async (_, { dispatch }) => {
        try {
            const response      = await api.get('/task');
            const tasksData     = response.data;
            
            // start: task.date_end,
            // end: task.date_end,
            
            const tasks  = tasksData.map( ( task: any ) => {

                const dateInitDay = new Date( task.completion_at ).toISOString().split('T')[0] + 'T00:00:00';

                return {
                    id: task.id,
                    title: task.title,
                    start: dateInitDay,
                    end: task.completion_at,
                    resourceId: task.status,
                    extendedProps: {
                        status: task.status
                    }
                };
            } );


            dispatch( setAllMyTasks( tasks ) );
        } catch (error) {
            dispatch( setAllMyTasks( [] ) );
        }
    }
);