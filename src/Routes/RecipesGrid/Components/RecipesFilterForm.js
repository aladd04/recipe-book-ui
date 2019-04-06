import React, {
  useState
} from "react";
import {
  TextField,
  Typography,
  Divider,
  IconButton,
  Collapse
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

export function RecipesFilterForm(props) {
  const [isFilterShown, setIsFilterShown] = useState(true);

  function handleSearchQueryChange(e) {
    props.handleSearchQueryChange(e.target.value);
  }

  function toggleFilterVisibility() {
    setIsFilterShown(!isFilterShown);
  }

  return (
    <React.Fragment>
      <div className="rb-recipe-filter-header">
        <IconButton onClick={toggleFilterVisibility}>
          <FilterListIcon />
        </IconButton>
        <Typography variant="subtitle1" style={{ paddingLeft: 5 }}>
          Filter Recipes
        </Typography>
      </div>
      <Collapse in={isFilterShown}>
        <Divider style={{ marginTop: 5 }} />
        <TextField
          fullWidth
          value={props.nameQuery}
          onChange={handleSearchQueryChange}
          label="Recipe Name"
          placeholder="Nom nom nom..."
          margin="normal"
          variant="outlined" />
      </Collapse>
    </React.Fragment>
  );
}