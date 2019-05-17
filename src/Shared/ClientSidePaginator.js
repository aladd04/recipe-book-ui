import React from "react";
import {
  Typography,
  Tooltip,
  IconButton
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export function ClientSidePaginator(props) {
  const previousButtonDisabled = props.currentPageNumber <= 1;
  const nextButtonDisabled = props.currentPageNumber === props.maxPageNumber;

  return (
    <div className="rb-paginator">
      <Tooltip title="Previous Page" placement="right">
        <div className={previousButtonDisabled ? "not-allowed" : ""}>
          <IconButton
            onClick={props.decrementPageNumber}
            disabled={previousButtonDisabled}>
            <ArrowBackIcon />
          </IconButton>
        </div>
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
        <div className={nextButtonDisabled ? "not-allowed" : ""}>
          <IconButton
            onClick={props.incrementPageNumber}
            disabled={nextButtonDisabled}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </Tooltip>
    </div>
  );
}
