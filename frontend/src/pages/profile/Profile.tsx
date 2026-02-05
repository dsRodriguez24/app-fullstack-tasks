import { Box, Button, Grid, LinearProgress, TextField } from '@mui/material';
import { Typography, IconButton, InputAdornment, Paper } from '@mui/material';
import { handleUpdateMe } from 'api/updateProfile';
import { toastSw2 } from 'helpers/toastSw2';
import { useState } from 'react';
import { useAppSelector } from 'store/hooks';

const Profile = () => {
    const { user } = useAppSelector((state) => state.auth);
    
    const [ loadingUpdate, setLoadingUpdate] = useState(false)

    const [ form, setForm ] = useState({
        name: user.name ? user.name : '',
        last_name: user.last_name ? user.last_name : '',
        // email: user.email ? user.email : '',
        password: '',
        confirmPassword: '',
    });

    const [ showPassword, setShowPassword ] = useState(false);
    const [ error, setError ]               = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm( {
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if (form.password && form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setError('');

        const payload = {
            name: form.name,
            last_name: form.last_name,
            // email: form.email,
            ...(form.password && { password: form.password }),
        };

        setLoadingUpdate(true);
        try {
            const update = await handleUpdateMe(payload);
            if (update) {
                toastSw2('Perfil actualizado', 'Los datos se han actualizado correctamente', 'success');
            } else {
                toastSw2('Error', 'Ha ocurrido un error al actualizar los datos', 'error');
            }
        } catch (err) {
            toastSw2('Error', 'Ha ocurrido un error al actualizar los datos', 'error');
        } finally {
            setLoadingUpdate(false);
        }
    };

    return (
    <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
            Actualizar Datos
        </Typography>

        <Box component="form" onSubmit={handleSubmit} autoComplete="off" noValidate>
        {/* Campos ocultos para evitar que algunos navegadores completen automáticamente */}
        <input type="text" name="__hidden_username" autoComplete="username" style={{ display: 'none' }} />
        <input type="password" name="__hidden_password" autoComplete="new-password" style={{ display: 'none' }} />
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
                label="Nombre"
                name="name"
                autoComplete='off'
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
            />
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete='off'
                label="Apellido"
                name="last_name"
                fullWidth
                required
                value={form.last_name}
                onChange={handleChange}
            />
            </Grid>

            {/* <Grid item xs={12}>
            <TextField
                autoComplete="off"
                label="Correo electrónico"
                name="email"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
                inputProps={{ autoComplete: 'off' }}
            />
            </Grid> */}

            <Grid item xs={12}>
            <TextField
                label="Nueva contraseña (opcional)"
                name="password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={form.password}
                onChange={handleChange}
                inputProps={{ autoComplete: 'new-password' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end"></IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            </Grid>

            {form.password && (
                <Grid item xs={12}>
                    <TextField
                        label="Confirmar contraseña"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        required
                        value={form.confirmPassword}
                        onChange={handleChange}
                        error={!!error}
                        helperText={error}
                        inputProps={{ autoComplete: 'new-password' }}
                    />
                </Grid>
            )}

            { loadingUpdate && (
                <Grid item xs={12}>
                    <LinearProgress sx={{ width: '100%' }} />
                </Grid>
            )}
            
            <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }} disabled={loadingUpdate}>
                    Guardar cambios
                </Button>
            </Grid>
        </Grid>
        </Box>
    </Paper>
    );
};

export default Profile;
