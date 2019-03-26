import React from "react";
import { Button, Typography } from "@material-ui/core";

export function Paginator(props) {
  function decrementPageNumber() {
    const newPageNumber = Math.max(0, props.pageNumber - 1);

    props.handleNewPageNumber(newPageNumber);
  }

  function incrementPageNumber() {
    let newPageNumber = props.pageNumber + 1;
    const possibleStartingPageIndex = newPageNumber * props.pageSize;

    if (possibleStartingPageIndex >= props.matchingCount) {
      newPageNumber--;
    }

    props.handleNewPageNumber(newPageNumber);
  }
  
  return (
    <React.Fragment>
      <Button onClick={decrementPageNumber}>
        Prev page
      </Button>
      <Button onClick={incrementPageNumber}>
        Next page
      </Button>
      <Button onClick={props.handleReset}>
        Reset
      </Button>
      <Typography>
        Showing {props.startNumber} - {props.endNumber}
        &nbsp;of {props.matchingCount}
      </Typography>
      <Typography>
        {props.allCount} total
      </Typography>
    </React.Fragment>
  );
}