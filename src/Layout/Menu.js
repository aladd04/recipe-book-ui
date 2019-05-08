import authHelper from "../Helpers/authHelper";
import { NavigationDrawer } from "./NavigationDrawer";
import React, {
  useState
} from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FastFoodIcon from "@material-ui/icons/Fastfood";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";

export function Menu() {
  const user = authHelper.getCurrentUser();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const alwaysActions = [{
      text: "Recipes",
      url: "/",
      icon: <FastFoodIcon />
    }
  ];

  const signedOutActions = [{
      text: "Login",
      url: "/login",
      icon: <ArrowForward />
    }
  ];

  const signedInActions = [{
      text: "Settings",
      url: "/settings",
      icon: <SettingsIcon />
    }, {
      text: "Logout",
      url: "/logout",
      icon: <ArrowBack />
    }
  ];

  function toggleDrawer() {
    setIsOpenDrawer(!isOpenDrawer);
  }

  return (
    <React.Fragment>
      <NavigationDrawer
        header="Recipe Book"
        isOpen={isOpenDrawer}
        toggleOpen={toggleDrawer}
        primaryActions={alwaysActions}
        otherActions={user.isLoggedIn ? signedInActions : signedOutActions} />
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            Recipe Book
          </Typography>
          {!user.isLoggedIn ? null : (
            <Typography variant="h6" color="inherit">
              Hello, {user.info.firstName}!
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
