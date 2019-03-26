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
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(6);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [matchingRecipesCount, setMatchingRecipesCount] = useState(0);
  const [totalRecipesCount, setTotalRecipesCount] = useState(0);
  const [startingPaginationNumber, setStartingPaginationNumber] = useState(0);
  const [endingPaginationNumber, setEndingPaginationNumber] = useState(0);

  useEffect(() => {
    let matchingRecipes = getAllRecipes();
    setTotalRecipesCount(matchingRecipes.length);

    if (nameQuery !== "") {
      matchingRecipes = matchingRecipes.filter(recipe => {
        return recipe.Name.toLowerCase().includes(nameQuery.toLowerCase());
      });
    }

    const startingIndex = pageNumber * pageSize;
    let endingIndex = (pageNumber * pageSize) + pageSize;
    if (endingIndex > matchingRecipes.length) {
      endingIndex = matchingRecipes.length;
    }

    setDisplayedRecipes(matchingRecipes.slice(startingIndex, endingIndex));
    setMatchingRecipesCount(matchingRecipes.length);
    setStartingPaginationNumber(startingIndex + 1);
    setEndingPaginationNumber(endingIndex);
  }, [nameQuery, pageNumber]);

  function handleSearchQueryChange(newNameQuery) {
    setNameQuery(newNameQuery);
  }

  function handlePageNumberChange(newPageNumber) {
    setPageNumber(newPageNumber);
  }

  function handleFilterReset() {
    setNameQuery("");
    setPageNumber(0);
    setSortBy("");
  }

  function handleSortByChange(newSortBy) {
    setSortBy(newSortBy);
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
              pageNumber={pageNumber}
              pageSize={pageSize}
              matchingCount={matchingRecipesCount}
              startNumber={startingPaginationNumber}
              endNumber={endingPaginationNumber}
              allCount={totalRecipesCount}
              handleReset={handleFilterReset}
              handleNewPageNumber={handlePageNumberChange} />
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