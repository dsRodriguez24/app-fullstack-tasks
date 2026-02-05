import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { MenuItem } from 'routes/sitemap';

interface CollapsedItemProps {
  items: MenuItem[];
  open: boolean;
}

const CollapsedItems = ({ items, open }: CollapsedItemProps) => {
  const location = useLocation();

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="ul">
        {items?.map((item) => (
          <ListItem key={item.id} sx={{ py: 0, pl: 7, pr: 0 }}>
            <ListItemButton
              selected={location.pathname === item.path || (item.path ? location.pathname.startsWith(item.path) : false)}
              component={item.path ? RouterLink : 'div'}
              to={item.path}
              sx={{ opacity: item.active ? 1 : 0.5, pl: 3, mt: 0.5 }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};

export default CollapsedItems;
