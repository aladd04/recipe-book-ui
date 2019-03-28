import React, { useState } from "react";
import { TextField, Typography, Divider, Tooltip, IconButton, Collapse } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

export function RecipeFilterForm(props) {
  const [isFilterShown, setIsFilterShown] = useState(false);

  function handleSearchQueryChange(e) {
    props.handleSearchQueryChange(e.target.value);
  }

  function toggleFilterVisibility() {
    setIsFilterShown(!isFilterShown);
  }

  return (
    <React.Fragment>
      <div className="rb-recipe-filter-header">
        <Tooltip title="Filter Recipes" placement="left">
          <IconButton onClick={toggleFilterVisibility}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="subtitle1">
          Filter Recipes
        </Typography>
      </div>
      <Collapse in={isFilterShown}>
        <Divider />
        <TextField
          value={props.nameQuery}
          onChange={handleSearchQueryChange}
          label="Recipe Name"
          margin="normal"
          variant="outlined" />
      </Collapse>
    </React.Fragment>
  );
}