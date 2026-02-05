import { Box, List, Stack, Toolbar } from '@mui/material';
import sitemap from 'routes/sitemap';
import paths from 'routes/paths';
import LogoHeader from './LogoHeader';
import NavItem from './NavItem';
import { useAppSelector } from 'store/hooks';

// Show different menu items depending on auth state (localStorage flag)

const NavItems = () => {
  // const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const { token } = useAppSelector((state) => state.auth);


  const isAuth = token ? true : false;

  const items = isAuth
    ? sitemap
    : [
        { id: 1000, name: 'Sign in', path: paths.signin, pathName: 'sign-in', active: true },
        { id: 1001, name: 'Sign up', path: paths.signup, pathName: 'sign-up', active: true },
      ];

  return (
    <List
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {items.map((navItem) => (
        <NavItem key={navItem.id} item={navItem} />
      ))}
    </List>
  );
};

const SidebarContent = () => {
  return (
    <>
      <Toolbar disableGutters>
        <LogoHeader />
      </Toolbar>

      <Box
        sx={(theme) => ({
          px: 5,
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          overflowY: 'auto',
        })}
      >
        <Stack gap={17} py={4}>
          <NavItems />
        </Stack>
      </Box>
    </>
  );
};

export default SidebarContent;
