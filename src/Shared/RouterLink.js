import React from "react";
import { Link } from "react-router-dom";

export function RouterLink(props) {
  return (
    <Link {...props} style={{ textDecoration: "none" }}>
      {props.children}
    </Link>
  );
}
