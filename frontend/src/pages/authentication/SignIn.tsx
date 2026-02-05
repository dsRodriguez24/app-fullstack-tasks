import { Alert, Box, Button, Container} from '@mui/material';
import { Link, Paper, Stack, TextField, Typography} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import paths, { rootPaths } from 'routes/paths';
import LogoHeader from 'layouts/main-layout/sidebar/LogoHeader';
import PasswordTextField from 'components/common/PasswordTextField';
import { handleLogIn } from 'api/login';
import { useAppDispatch } from 'store/hooks';
import { setCredentials } from 'store/authSlice';

const SignIn = () => {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [ email, setEmail ]                       = useState('');
  const [ statusValidated, setStatusValidated ]   = useState(0);
  const [ password, setPassword ]                 = useState('');
  const [ validating, setValidating ]             = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setValidating(true);
    
    setTimeout(() => {
      setStatusValidated(0);
    }, 5000);


    const login                   = await handleLogIn(email, password);
    const { user, access_token }  = login;
    
    setValidating(false);

    dispatch( setCredentials( { user, token: access_token } ) );
    
    if ( !user ) {
      setStatusValidated(1);
      return;
    };
    
    setStatusValidated(2);

    localStorage.setItem('refreshToken', 'true');
    navigate(`${rootPaths.root}/tasks`);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <LogoHeader sx={{ justifyContent: 'center', mb: 5 }} />

      <Paper sx={{ p: 5 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="h3">Iniciar sesión</Typography>
          <Typography variant="subtitle2" color="neutral.main">
            o{' '}
            <NavLink to={ `${paths.signup}` } >Crear una cuenta</NavLink>
          </Typography>
        </Stack>

        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="email"
              name="email"
              type="email"
              placeholder="Introduce tu correo electrónico"
              autoComplete="email"
              fullWidth
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <PasswordTextField
              id="password"
              name="password"
              placeholder="Introduce tu contraseña"
              autoComplete="current-password"
              fullWidth
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Stack>

          { statusValidated > 0 && <Alert severity={ statusValidated === 1 ? "error" : "success"} sx={ { mt: 2 } } >{ statusValidated === 1 ? "Credenciales incorrectas" : "Inicio de sesion correcto. Redirigiendo..."} </Alert> }

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            mt={1}
            spacing={0.5}
          >
          </Stack>

          <Button disabled={validating} type="submit" size="large" variant="contained" sx={{ mt: 2 }} fullWidth>
            Iniciar sesión
          </Button>

        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
