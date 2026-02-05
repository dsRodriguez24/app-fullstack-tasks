import { Alert, Box, Button, Container, Grid } from '@mui/material';
import { Link, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths, { rootPaths } from 'routes/paths';
import PasswordTextField from 'components/common/PasswordTextField';
import LogoHeader from 'layouts/main-layout/sidebar/LogoHeader';
import { handleSignUp } from 'api/signup';
import { validate } from 'helpers/signup';

const checkBoxLabel = { inputProps: { 'aria-label': 'Aceptar términos' } };

const SignUp = () => {
  const navigate = useNavigate();

  const [statusValidated, setStatusValidated]     = useState(0);
  const [messageValidated, setMessageValidated]   = useState('');
  
  const [ firstName, setFirstName ]               = useState('');
  const [ lastName, setLastName ]                 = useState('');
  const [ email, setEmail ]                       = useState('');
  const [ password, setPassword ]                 = useState('');
  const [ confirmPassword, setConfirmPassword ]   = useState('');

  const [errors, setErrors] = useState<{ [k: string]: string }>( {} );

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!validate( { firstName, lastName, email, password, confirmPassword, setErrors })) return;

    const {success, message }  = await handleSignUp(firstName, lastName, email, password);
    
    setTimeout(() => {
      setStatusValidated(0);
    }, 3500);
    
    setStatusValidated( success ? 2 : 1);
    setMessageValidated( message );

    if (!success) return;

    setTimeout(() => {
      navigate(rootPaths.root);
    }, 2000);
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
          <Typography variant="h3">Crear cuenta</Typography>
          <Typography variant="subtitle2" color="neutral.main">
            ¿Ya tienes una cuenta?{' '}
            <Link component={RouterLink} to={paths.signin} underline="hover">
              Iniciar sesión
            </Link>
          </Typography>
        </Stack>

        <Box component="form" sx={{ mt: 3 }} onSubmit={  handleSubmit } noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Introduce tu nombre"
                autoComplete="given-name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Introduce tu apellido"
                autoComplete="family-name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Introduce tu correo electrónico"
                autoComplete="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <PasswordTextField
                id="password"
                name="password"
                label="Contraseña"
                placeholder="Introduce tu contraseña"
                autoComplete="new-password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <PasswordTextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>

          </Grid>

          { statusValidated > 0 && <Alert severity={ statusValidated === 1 ? "error" : "success"} sx={ { mt: 2 } } >{ messageValidated} </Alert> }
          

          <Button type="submit" size="large" variant="contained" sx={{ mt: 2 }} fullWidth>
            Crear cuenta
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
