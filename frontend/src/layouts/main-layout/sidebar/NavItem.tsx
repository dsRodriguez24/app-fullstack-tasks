import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { MenuItem } from 'routes/sitemap';
import IconifyIcon from 'components/base/IconifyIcon';
import CollapsedItems from './CollapsedItems';

const NavItem = ({ item }: { item: MenuItem }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleCollapsedItem = () => {
    setOpen(!open);
  };

  const { name, path, icon, svgIcon: SvgIcon, active, items } = item;

  const Icon = icon ? (
    <IconifyIcon icon={icon} fontSize={32} />
  ) : SvgIcon ? (
    <SvgIcon sx={{ fontSize: 32 }} />
  ) : null;

  return (
    <ListItem
      sx={{
        flexDirection: 'column',
        alignItems: 'stretch',
        p: 0,
        opacity: active ? 1 : 0.5,
      }}
    >
      <ListItemButton
        selected={
          path ? location.pathname === path || location.pathname.startsWith(path) : false
        }
        component={path ? RouterLink : 'div'}
        onClick={handleCollapsedItem}
        to={path}
        sx={[
          location.pathname === path && {
            '.MuiListItemIcon-root': {
              color: 'common.white',
            },
          },
          {
            '&:hover .MuiListItemIcon-root': {
              color: 'common.white',
            },
          },
          { pl: 3, py: 2 },
        ]}
      >
        <ListItemIcon sx={{ mr: 3, color: 'primary.light', transition: 'color 0.3s' }}>
          {Icon}
        </ListItemIcon>
        <ListItemText primary={name} sx={[location.pathname === path && { fontWeight: 600 }]} />
        {items && <IconifyIcon icon={open ? 'ph:caret-up-bold' : 'ph:caret-down-bold'} />}
      </ListItemButton>

      {items && <CollapsedItems items={items} open={open} />}
    </ListItem>
  );
};

export default NavItem;
