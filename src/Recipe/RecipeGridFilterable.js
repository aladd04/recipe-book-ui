import { PageHeader } from "../Helpers/PageHeader";
import { Paginator } from "../Helpers/Paginator";
import { RecipeCardMini } from "./RecipeCardMini";
import { getAllRecipes } from "./recipeService";
import "./recipe.css";

import React, { useState, useEffect } from "react";
import { Grid, Paper, Tooltip, IconButton } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { RecipeFilterForm } from "./RecipeFilterForm";

export function RecipeGridFilterable() {
  const [nameQuery, setNameQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [allRecipes] = useState(() => { return getAllRecipes(); });
  const [matchingRecipes, setMatchingRecipes] = useState(allRecipes);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  useEffect(() => {
    let workingRecipes = allRecipes;

    if (nameQuery !== "") {
      workingRecipes = workingRecipes.filter(recipe => {
        return recipe.Name.toLowerCase().includes(nameQuery.toLowerCase());
      });
    }

    setMatchingRecipes(workingRecipes);
  }, [nameQuery, sortBy]);

  function handleSearchQueryChange(newNameQuery) {
    setNameQuery(newNameQuery);
  }

  function handleSortByChange(newSortBy) {
    setSortBy(newSortBy);
  }

  function handlePageNumberChange(newStartIndex, newEndIndex) {
    setDisplayedRecipes(matchingRecipes.slice(newStartIndex, newEndIndex));
  }

  return (
    <React.Fragment>
      <PageHeader text="Recipes" />
      <Tooltip title="Filter">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper style={{ padding: 24 }}>
            <RecipeFilterForm
              sortBy={sortBy}
              nameQuery={nameQuery}
              handleSortByChange={handleSortByChange}
              handleSearchQueryChange={handleSearchQueryChange} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 24 }}>
            <Paginator
              pageSize={6}
              dataCount={matchingRecipes.length}
              masterDataCount={allRecipes.length}
              handlePageChange={handlePageNumberChange} />
          </Paper>
        </Grid>
        {displayedRecipes.map(recipe => (
          <Grid item md={4} sm={6} xs={12} key={recipe.Id}>
            <RecipeCardMini recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}