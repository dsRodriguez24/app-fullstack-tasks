import api from "api/axios";

export const handleLogIn = async (email:string, password:string) => {

    try {
        const response               = await api.post('/login', { email, password } );        
        const { access_token, user } = response.data;
        
        return {
            access_token, 
            user
        };
        
    } catch (error: any) {
        return {
            access_token: false, 
            user: null
        };
    }
};