import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { PageHeader } from "../Helpers/PageHeader";
import { Card, CardHeader, CardContent, CardActions, Grid, Button, Typography, Paper, TextField, Tooltip, IconButton, FormControl, InputLabel, Select, OutlinedInput } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { getAllRecipes } from "./recipeService";
import "./recipe.css";

export function Recipe() {
  let sortByLabelRef;

  const [nameQuery, setNameQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(6);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [matchingRecipesCount, setMatchingRecipesCount] = useState(0);
  const [totalRecipesCount, setTotalRecipesCount] = useState(0);
  const [startingPaginationNumber, setStartingPaginationNumber] = useState(0);
  const [endingPaginationNumber, setEndingPaginationNumber] = useState(0);
  const [sortByLabelWidth, setSortbyLabelWidth] = useState(0);

  useEffect(() => {
    setSortbyLabelWidth(ReactDOM.findDOMNode(sortByLabelRef).offsetWidth);

    let matchingRecipes = getAllRecipes();
    setTotalRecipesCount(matchingRecipes.length);

    if (nameQuery !== "") {
      matchingRecipes = matchingRecipes.filter(recipe => {
        return recipe.Name.toLowerCase().includes(nameQuery.toLowerCase());
      });
    }

    const startingIndex = pageNumber * pageSize;
    let endingIndex = (pageNumber * pageSize) + 6;
    if (endingIndex > matchingRecipes.length) {
      endingIndex = matchingRecipes.length;
    }

    setDisplayedRecipes(matchingRecipes.slice(startingIndex, endingIndex));
    setMatchingRecipesCount(matchingRecipes.length);
    setStartingPaginationNumber(startingIndex + 1);
    setEndingPaginationNumber(endingIndex);
  }, [nameQuery, pageNumber]);

  function getCardSubHeader(recipe) {
    const dateString = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: "true"
    }).format(new Date(recipe.UpdateDate));

    return `${recipe.OwnerName} - ${dateString}`;
  }

  function handleSearchQueryChange(e) {
    setNameQuery(e.target.value);
  }

  function handlePageNumberChange(newPageNumber) {
    if (newPageNumber < 0) {
      newPageNumber = 0;
    }

    if (newPageNumber * pageSize >= matchingRecipesCount) {
      newPageNumber = newPageNumber -1;
    }

    setPageNumber(newPageNumber);
  }

  function handleFilterReset() {
    setNameQuery("");
    setPageNumber(0);
    setSortBy("");
  }

  function handleSortBy(e) {
    setSortBy(e.target.value);
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
            <FormControl variant="outlined">
              <InputLabel htmlFor="sort-by"
                ref={ref => {
                  sortByLabelRef = ref;
                }}>
                Sort By
              </InputLabel>
              <Select
                native
                value={sortBy}
                onChange={handleSortBy}
                input={
                  <OutlinedInput labelWidth={sortByLabelWidth} id="sort-by" />}>
                <option value=""></option>
                <option value="desc">Descending</option>
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <TextField
                value={nameQuery}
                onChange={handleSearchQueryChange}
                label="Recipe Name"
                margin="normal"
                variant="outlined" />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 24 }}>
            <Button onClick={() => handlePageNumberChange(pageNumber - 1)}>
              Prev page
            </Button>
            <Button onClick={() => handlePageNumberChange(pageNumber + 1)}>
              Next page
            </Button>
            <Button onClick={handleFilterReset}>
              Reset
            </Button>
            <div>
              {startingPaginationNumber}-{endingPaginationNumber} of {matchingRecipesCount} ... {totalRecipesCount} total recipes
            </div>
          </Paper>
        </Grid>
        {displayedRecipes.map(recipe => (
          <Grid item md={4} sm={6} xs={12} key={recipe.Id}>
            <Card>
              <CardHeader
                title={recipe.Name}
                subheader={getCardSubHeader(recipe)} />
              <CardContent>
                <Typography>
                  {recipe.Description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  See More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}