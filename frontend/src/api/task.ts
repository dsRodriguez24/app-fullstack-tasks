import api from "api/axios";

export const handleSaveTask = async (data:any) => {

    try {
        const response  = await api.post('/task', data );        
        const task      = response.data;
        
        return task;
        
    } catch (error: any) {
        return {
            access_token: false, 
            user: false
        };
    }
};

export const handleUpdateTask = async (data:any) => {

    try {

        const { id }    = data
        // delete data.id;

        const response  = await api.put(`/task/${id}`, data );        
        const task      = response.data;
        return task;
        
    } catch (error: any) {
        return {
            access_token: false, 
            user: false
        };
    }
};
