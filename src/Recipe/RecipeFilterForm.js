import React, { useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { TextField, FormControl, InputLabel, Select, OutlinedInput } from "@material-ui/core";

export function RecipeFilterForm(props) {
  let sortByLabelRef;

  const [sortByLabelWidth, setSortByLabelWidth] = useState(0);

  useLayoutEffect(() => {
    setSortByLabelWidth(ReactDOM.findDOMNode(sortByLabelRef).offsetWidth);
  });

  function handleSortByChange(e) {
    props.handleSortByChange(e.target.value);
  }

  function handleSearchQueryChange(e) {
    props.handleSearchQueryChange(e.target.value);
  }

  return (
    <React.Fragment>
      <FormControl variant="outlined">
        <InputLabel htmlFor="sort-by"
          ref={ref => {
            sortByLabelRef = ref;
          }}>
          Sort By
        </InputLabel>
        <Select
          native
          value={props.sortBy}
          onChange={handleSortByChange}
          input={
            <OutlinedInput labelWidth={sortByLabelWidth} id="sort-by" />}>
          <option value=""></option>
          <option value="desc">Descending</option>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <TextField
          value={props.nameQuery}
          onChange={handleSearchQueryChange}
          label="Recipe Name"
          margin="normal"
          variant="outlined" />
      </FormControl>
    </React.Fragment>
  );
}