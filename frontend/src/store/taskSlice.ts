// src/store/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TasksState {
    statusMap: { [ key: number ]: string };
    tasks: [];
}

const initialState: TasksState = {
    statusMap: { 0: 'pendiente', 1: 'en ejecucion' },
    tasks:[]
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTaskStatus: (state, action: PayloadAction<{ id: number; status: string }>) => {
            const { id, status } = action.payload;
            state.statusMap[id] = status;
        },
        setAllMyTasks : (state, action: PayloadAction<any>) => {
            state.tasks = action.payload;
        },
    },
});

export const { updateTaskStatus, setAllMyTasks } = tasksSlice.actions;
export default tasksSlice.reducer;