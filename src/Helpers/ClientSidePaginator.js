import React from "react";
import {
  Typography,
  Tooltip,
  IconButton
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export function ClientSidePaginator(props) {
  return (
    <div className="rb-paginator">
      <Tooltip title="Previous Page" placement="right">
        <IconButton onClick={props.decrementPageNumber}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="caption" className="rb-paginator-help-text">
        <span>
          Showing
          <b> {props.displayStartNumber} </b>-
          <b> {props.displayEndNumber} </b>of
          <b> {props.dataCount}</b>
        </span>
        <span>
          Page
          <b> {props.currentPageNumber} </b>of
          <b> {props.maxPageNumber}</b>
        </span>
      </Typography>
      <Tooltip title="Next Page" placement="left">
        <IconButton onClick={props.incrementPageNumber}>
          <ArrowForwardIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}