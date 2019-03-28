import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Typography } from "@material-ui/core";

export function DrawerNavigationList(props) {
  function getListHtml(actions) {
    return (
      <List>
        {actions.map(m => (
          <RouterLink
            key={m.text}
            to={m.url}
            onClick={props.toggleOpen}
            style={{ textDecoration: "none" }}>
            <ListItem button>
              <ListItemIcon>
                {m.icon}
              </ListItemIcon>
              <ListItemText primary={m.text} />
            </ListItem>
          </RouterLink>
        ))}
      </List>
    );
  }

  return (
    <Drawer open={props.isOpen} onClose={props.toggleOpen}>
      <Typography variant="h6" style={{ padding: 12 }}>
        {props.header}
      </Typography>
      <Divider />
      {getListHtml(props.primaryActions)}
      <Divider />
      {getListHtml(props.otherActions)}
    </Drawer>
  );
}