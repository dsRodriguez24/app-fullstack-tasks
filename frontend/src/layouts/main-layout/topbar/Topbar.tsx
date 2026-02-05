import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { rootPaths } from 'routes/paths';
import sitemap from 'routes/sitemap';
import Logo from 'components/icons/Logo';
import IconifyIcon from 'components/base/IconifyIcon';
import ElevationScroll from './ElevationScroll';
import AccountDropdown from './AccountDropdown';
import Notification from './Notification';

interface TopbarProps {
  drawerWidth: number;
  onHandleDrawerToggle: () => void;
}

const Topbar = ({ drawerWidth, onHandleDrawerToggle }: TopbarProps) => {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const navItem = sitemap.find((navItem) => location.pathname === navItem.path);
    if (navItem && navItem.name) return navItem.name;
    // fallback: try to match by pathname segment or return empty string
    const match = sitemap.find((item) => item.path && location.pathname.endsWith(item.path));
    return match?.name ?? '';
  }, [ location ] );

  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 5 },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            columnGap={{ xs: 1, sm: 2 }}
            sx={{ display: { lg: 'none' } }}
          >
            <RouterLink to={rootPaths.root}>
              <IconButton color="inherit" aria-label="logo">
                <Logo sx={{ fontSize: 56 }} />
              </IconButton>
            </RouterLink>

            <IconButton color="inherit" aria-label="open drawer" onClick={onHandleDrawerToggle}>
              <IconifyIcon icon="mdi:hamburger-menu" sx={{ fontSize: { xs: 24, sm: 32 } }} />
            </IconButton>
          </Stack>

          <Typography
            variant="h1"
            color="primary.darker"
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            {pageTitle}
          </Typography>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={{ xs: 1, sm: 2, xl: 5.25 }}
            width={1}
          >
            {/* <Notification /> */}
            <AccountDropdown />
          </Stack>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Topbar;
