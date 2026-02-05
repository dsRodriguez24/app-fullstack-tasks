import { Stack, SxProps, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import IconifyIcon from 'components/base/IconifyIcon';
import { rootPaths } from 'routes/paths';

interface LogoHeaderProps {
  sx?: SxProps;
}
const LogoHeader = (props: LogoHeaderProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      columnGap={3}
      component={RouterLink}
      to={rootPaths.root}
      {...props}
    >
      {/* <Logo sx={ { fontSize: 56 } } /> */}

      <IconifyIcon icon="mdi:calendar-task" sx={{ fontSize: 32 }} />
      <Typography variant="h2" color="primary.darker">
        Taskware
      </Typography>
    </Stack>
  );
};

export default LogoHeader;
