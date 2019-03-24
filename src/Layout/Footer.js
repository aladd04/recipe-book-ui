import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";

function Footer(props) {
  const today = new Date();

  return (
    <footer className={props.classes.footerContainer}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p">
        <span>
          {`© ${today.getFullYear()} | Andrew Ladd | `}
        </span>
        <Link href="mailto:aladd04@gmail.com">
          Contact
        </Link>
      </Typography>
    </footer>
  );
}

function FooterStyles(theme) {
  return {
    footerContainer: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing.unit * 4,
      padding: `${theme.spacing.unit * 3}px 0`,
      boxShadow: "0 -2px 2px 0 rgba(0, 0, 0, .3)"
    }
  };
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(FooterStyles)(Footer);