import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemIcon, ListItemText, Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import "./menu.css";

export function Menu() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const menuActions = [{
      text: "Recipes",
      url: "/",
      icon: <div>ICON HERE</div>
    }, {
      text: "Login",
      url: "/login",
      icon: <div>ICON HERE</div>
    }
  ];

  function toggleDrawerOpen() {
    setIsOpenDrawer(!isOpenDrawer);
  }

  return (
    <div>
      <Drawer open={isOpenDrawer} onClose={toggleDrawerOpen}>
        <List>
          {menuActions.map(m => (
            <Link key={m.text} to={m.url} onClick={toggleDrawerOpen}>
              <ListItem button>
                <ListItemIcon>
                  {m.icon}
                </ListItemIcon>
                <ListItemText primary={m.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className="menu-header">
            Recipe Book
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}