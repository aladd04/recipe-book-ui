import React from "react";
import {
  Typography,
  Link
} from "@material-ui/core";

export function Footer() {
  const today = new Date();

  return (
    <footer className="footer-container">
      <Typography
        variant="subtitle1"
        align="center"
        color="inherit"
        component="p">
        <span>
          {`© ${today.getFullYear()} Andrew Ladd `}
        </span>
        <Link href="mailto:aladd04@gmail.com" style={{ color: "#9e9e9e" }}>
          Contact
        </Link>
      </Typography>
    </footer>
  );
}