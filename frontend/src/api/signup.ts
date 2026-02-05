import api from "api/axios";
export const handleSignUp = async (name: string, last_name: string, email: string, password: string) => {
    try {
        const response = await api.post('/register', { name, last_name, email, password });
        const data = response.data;

        // Si Laravel responde con 200/201
        if (data.id || data.success) {
            return {
                success: true,
                message: `Usuario Creado Correctamente`,
            };
        }

        return {
            success: false,
            message: `Ha ocurrido un error inesperado`,
        };

    } catch (error: any) {

        if (error.response) {

            const serverErrors = error.response.data.errors;
            const serverMessage = error.response.data.message;

            if (serverErrors && serverErrors.email) {
                return {
                    success: false,
                    message: `El email ${email} ya se encuentra asociado a una cuenta`,
                };
            }

            // Si no es el email, devolvemos el mensaje general que envió el backend
            return {
                success: false,
                message: serverMessage || 'Error de validación en el servidor',
            };
        }

        // 2. Error de red o problema sin respuesta del servidor
        return {
            success: false,
            message: 'No se pudo conectar con el servidor',
        };
    }
};