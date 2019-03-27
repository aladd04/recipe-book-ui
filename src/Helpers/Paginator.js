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
  }, [props.data]);

  function handlePageChange() {
    const pagingStartIndex = pageNumber * props.pageSize;
    const pagingEndIndex = 
      Math.min(props.data.length, pagingStartIndex + props.pageSize);

    setStartNumber(pagingStartIndex + 1);
    setEndNumber(pagingEndIndex);

    props.handlePageChange(props.data.slice(pagingStartIndex, pagingEndIndex));
  }

  function decrementPageNumber() {
    const newPageNumber = Math.max(0, pageNumber - 1);

    setPageNumber(newPageNumber);
  }

  function incrementPageNumber() {
    const maxPageNumber = getMaxPageNumber() - 1;
    const newPageNumber 
      = pageNumber >= maxPageNumber ? maxPageNumber : pageNumber + 1;

    setPageNumber(newPageNumber);
  }

  function getMaxPageNumber() {
    return Math.ceil(props.data.length / props.pageSize);
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
        Showing {startNumber} - {endNumber} of {props.data.length}
      </Typography>
      <Typography>
        On page {pageNumber + 1} of {getMaxPageNumber()} pages
      </Typography>
      <Typography>
        {props.masterDataCount} total
      </Typography>
    </React.Fragment>
  );
}