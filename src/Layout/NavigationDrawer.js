import { RouterLink } from "../Helpers/RouterLink";

import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Typography
} from "@material-ui/core";

export function NavigationDrawer(props) {
  return (
    <Drawer open={props.isOpen} onClose={props.toggleOpen}>
      <Typography variant="h6" style={{ padding: 12 }}>
        {props.header}
      </Typography>
      <Divider />
      <NavigationDrawerList actions={props.primaryActions} {...props} />
      {/* <Divider />
      <NavigationDrawerList actions={props.otherActions} {...props} /> */}
    </Drawer>
  );
}

function NavigationDrawerList(props) {
  return (
    <List>
      {props.actions.map(a => (
        <RouterLink
          key={a.text}
          to={a.url}
          onClick={props.toggleOpen}>
          <ListItem button>
            <ListItemIcon>
              {a.icon}
            </ListItemIcon>
            <ListItemText primary={a.text} />
          </ListItem>
        </RouterLink>
      ))}
    </List>
  );
}