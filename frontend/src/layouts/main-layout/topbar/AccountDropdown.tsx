import { Avatar, Box, Button, ListItemIcon } from '@mui/material';
import {  Menu, MenuItem, Stack, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';
import Profile from 'assets/UserPlaceholder.webp';
import IconifyIcon from 'components/base/IconifyIcon';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout } from 'store/authSlice';

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  click?: (e: any) => void;
}

const AccountDropdown = () => {

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const [ anchorEl, setAnchorEl ]  = useState<null | HTMLElement>(null);
  const open                       = Boolean(anchorEl);

  
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleLogout = (event: MouseEvent<HTMLElement>) => {
    dispatch( logout() );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems: MenuItem[] = [
    {
      id: 0,
      label: `${user.name ? user.name : ''} ${user.last_name ? user.last_name : ''}`,
      icon: 'material-symbols:person',
      click: (e: any) => {
        handleClick(e);
      },
    },
    {
      id: 0,
      label: `Cerrar Sesión`,
      icon: 'material-symbols:logout-rounded',
      click: (e: any) => {
        handleLogout(e);
      },
    }
  ];


  const accountMenuItems = menuItems.map((menuItem) => (
    <MenuItem
      key={menuItem.id}
      onClick={menuItem.click}
      sx={{
        '&:hover .account-menu-icon': { color: 'common.white' },
      }}
    >
      <ListItemIcon>
        <IconifyIcon
          icon={menuItem.icon}
          sx={{ color: 'primary.main' }}
          className="account-menu-icon"
        />
      </ListItemIcon>
      <Typography variant="body1">{ menuItem.label }</Typography>
    </MenuItem>
  ));

  return (
    <>
      <Button
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ px: { xs: 1, sm: 2 }, minWidth: 'auto' }}
      >
        <Avatar
          sx={{
            width: { xs: 48, sm: 60 },
            height: { xs: 48, sm: 60 },
            borderRadius: 4,
            mr: { xs: 0, xl: 2.5 },
          }}
          alt="User Profile"
          src={Profile}
        />
        <Box sx={{ display: { xs: 'none', xl: 'block' } }}>
          <Stack direction="row" alignItems="center" columnGap={6}>
            <Typography variant="h6" component="p" color="primary.darker" gutterBottom>
              Musfiq
            </Typography>
            <IconifyIcon icon="ph:caret-down-bold" fontSize={16} color="primary.darker" />
          </Stack>
          <Typography variant="subtitle2" textAlign="left" color="primary.lighter">
            Admin
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {accountMenuItems}
        
      </Menu>
    </>
  );
};

export default AccountDropdown;
