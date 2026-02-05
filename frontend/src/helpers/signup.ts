export  const validate = (props: any) => {

    const { firstName, lastName, email, password, confirmPassword, setErrors } = props;

    const e: { [k: string]: string } = {};
    if (!firstName.trim()) e.firstName  = 'El nombre es requerido';
    if (!lastName.trim()) e.lastName    = 'El apellido es requerido';
    if (!email.trim()) e.email          = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email inválido';
    if (!password) e.password = 'La contraseña es requerida';
    else if (password.length < 8) e.password = 'La contraseña debe tener al menos 8 caracteres';
    if (!confirmPassword) e.confirmPassword = 'Confirmar contraseña es requerido';
    else if (password !== confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  };