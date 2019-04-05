import useClientSidePagination from "../../../Hooks/useClientSidePagination";
import { ClientSidePaginator } from "../../../Helpers/ClientSidePaginator";
import { RecipesFilterForm } from "./RecipesFilterForm";
import { RecipeGridCard } from "./RecipeGridCard";

import React, {
  useState,
  useEffect
} from "react";
import {
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import MoodBadIcon from "@material-ui/icons/MoodBad";

export function FilterableRecipesGrid({ allRecipes }) {
  const paginator = useClientSidePagination(6);
  const [matchingRecipes, setMatchingRecipes] = useState([]);
  const [nameQuery, setNameQuery] = useState("");

  useEffect(() => {
    let workingRecipes = [...allRecipes];

    if (nameQuery !== "") {
      workingRecipes = workingRecipes.filter(r => {
        return r.name.toLowerCase().includes(nameQuery.toLowerCase());
      });
    }

    sortRecipesByName(workingRecipes);

    paginator.handleNewDataReceived(workingRecipes.length);
    setMatchingRecipes(workingRecipes);
  }, [nameQuery]);

  function handleSearchQueryChange(newNameQuery) {
    setNameQuery(newNameQuery);
  }

  function sortRecipesByName(recipes) {
    recipes.sort((a, b) => {
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  }

  const recipesToDisplay = paginator.getDataToDisplay(matchingRecipes);

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Paper style={{ padding: 12 }}>
          <RecipesFilterForm
            nameQuery={nameQuery}
            handleSearchQueryChange={handleSearchQueryChange} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <ClientSidePaginator
          decrementPageNumber={paginator.decrementPageNumber}
          displayStartNumber={paginator.displayStartNumber}
          displayEndNumber={paginator.displayEndNumber}
          dataCount={paginator.dataCount}
          currentPageNumber={paginator.pageNumber}
          maxPageNumber={paginator.maxPageNumber}
          incrementPageNumber={paginator.incrementPageNumber} />
      </Grid>
      {recipesToDisplay.length > 0 ? recipesToDisplay.map(r => (
        <Grid item md={4} sm={6} xs={12} key={r.id}>
          <RecipeGridCard recipe={r} />
        </Grid>
      )) : (
        <Grid item xs={12} className="rb-no-recipe-results-container">
          <MoodBadIcon fontSize="large" />
          <Typography variant="subtitle1">
            Oh no! It looks like that food doesn't exist!
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <ClientSidePaginator
          decrementPageNumber={paginator.decrementPageNumber}
          displayStartNumber={paginator.displayStartNumber}
          displayEndNumber={paginator.displayEndNumber}
          dataCount={paginator.dataCount}
          currentPageNumber={paginator.pageNumber}
          maxPageNumber={paginator.maxPageNumber}
          incrementPageNumber={paginator.incrementPageNumber} />
      </Grid>
    </Grid>
  );
}