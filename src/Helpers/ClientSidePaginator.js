import React, {
  useState,
  useEffect
} from "react";
import {
  Typography,
  Tooltip,
  IconButton
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export function ClientSidePaginator(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [startNumber, setStartNumber] = useState(0);
  const [endNumber, setEndNumber] = useState(0);

  useEffect(() => {
    handlePageChange();
  }, [pageNumber, props.pageSize]);

  useEffect(() => {
    setPageNumber(0);
    handlePageChange();
  }, [props.data]);

  function handlePageChange() {
    const pagingStartIndex = pageNumber * props.pageSize;
    const pagingEndIndex = Math.min(
      props.data.length,
      pagingStartIndex + props.pageSize);

    setStartNumber(pagingEndIndex === 0 ? 0 : pagingStartIndex + 1);
    setEndNumber(pagingEndIndex);

    props.handlePageChange(pagingStartIndex, pagingEndIndex);
  }

  function decrementPageNumber() {
    setPageNumber(Math.max(0, pageNumber - 1));
  }

  function incrementPageNumber() {
    const maxPageNumber = getMaxPageNumber() - 1;
    const newPageNumber = pageNumber >= maxPageNumber
      ? maxPageNumber
      : pageNumber + 1;

    setPageNumber(newPageNumber);
  }

  function getMaxPageNumber() {
    return Math.ceil(props.data.length / props.pageSize);
  }
  
  const maxPageNumber = getMaxPageNumber();
  const currentPageNumber = maxPageNumber === 0 ? 0 : pageNumber + 1;

  return (
    <div className="rb-paginator">
      <Tooltip title="Previous Page" placement="left">
        <IconButton onClick={decrementPageNumber}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="caption" className="rb-paginator-help-text">
        <span>
          Showing <b>{startNumber}</b> - <b>{endNumber}</b>
          &nbsp;of <b>{props.data.length}</b>
        </span>
        <span>
          Page <b>{currentPageNumber}</b> of <b>{maxPageNumber}</b>
        </span>
      </Typography>
      <Tooltip title="Next Page" placement="right">
        <IconButton onClick={incrementPageNumber}>
          <ArrowForwardIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}