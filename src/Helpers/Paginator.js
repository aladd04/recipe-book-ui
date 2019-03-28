import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";

export function Paginator(props) {
  const [pageNumber, setPageNumber] = useState(0);
  const [startNumber, setStartNumber] = useState(0);
  const [endNumber, setEndNumber] = useState(0);

  useEffect(handlePageChange, [pageNumber, props.pageSize]);

  useEffect(() => {
    const pageChangeWillNotBeHandled = pageNumber === 0;

    setPageNumber(0);

    if (pageChangeWillNotBeHandled) {
      handlePageChange();
    }
  }, [props.dataCount]);

  function handlePageChange() {
    const pagingStartIndex = pageNumber * props.pageSize;
    const pagingEndIndex = Math.min(props.dataCount, pagingStartIndex + props.pageSize);

    setStartNumber(pagingEndIndex === 0 ? 0 : pagingStartIndex + 1);
    setEndNumber(pagingEndIndex);

    props.handlePageChange(pagingStartIndex, pagingEndIndex);
  }

  function decrementPageNumber() {
    const newPageNumber = Math.max(0, pageNumber - 1);

    setPageNumber(newPageNumber);
  }

  function incrementPageNumber() {
    const maxPageNumber = getMaxPageNumber() - 1;
    const newPageNumber = pageNumber >= maxPageNumber
      ? maxPageNumber
      : pageNumber + 1;

    setPageNumber(newPageNumber);
  }

  function getMaxPageNumber() {
    return Math.ceil(props.dataCount / props.pageSize);
  }
  
  return (
    <React.Fragment>
      <Button onClick={decrementPageNumber}>
        Prev page
      </Button>
      <Button onClick={incrementPageNumber}>
        Next page
      </Button>
      <Typography>
        Showing {startNumber} - {endNumber} of {props.dataCount}
      </Typography>
      <Typography>
        On page {getMaxPageNumber() === 0 ? 0 : pageNumber + 1} of {getMaxPageNumber()} pages
      </Typography>
      <Typography>
        {props.masterDataCount} total
      </Typography>
    </React.Fragment>
  );
}