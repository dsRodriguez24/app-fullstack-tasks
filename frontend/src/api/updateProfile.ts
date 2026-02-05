import api from "./axios";

export const handleUpdateMe = async (data:any) => {

    try {

        const response  = await api.put(`/me`, data );        
        const me        = response.data;
        return true;
        
    } catch (error: any) {
        return false;
    }
};
