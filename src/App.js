import React from "react";
import { Grid } from "@material-ui/core";
import { Menu } from "./MenuComponent/Menu";

export default function App() {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Menu />
      </Grid>
    </Grid>
  );
}