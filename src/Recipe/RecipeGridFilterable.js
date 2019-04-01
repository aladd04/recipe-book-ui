import useClientSidePagination from "../Hooks/useClientSidePagination";
import useRecipeService from "../Hooks/useRecipeService";
import { PageHeader } from "../Helpers/PageHeader";
import { ClientSidePaginator } from "../Helpers/ClientSidePaginator";
import { RecipeFilterForm } from "./RecipeFilterForm";
import { RecipeCardMini } from "./RecipeCardMini";

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

export function RecipeGridFilterable() {
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    recipeService.getAllRecipes(
      (response) => {
        setAllRecipes(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <RecipeGridFilterableView allRecipes={allRecipes} />
      )}
    </React.Fragment>
  );
}

function RecipeGridFilterableView({ allRecipes }) {
  const paginator = useClientSidePagination(6);
  const [nameQuery, setNameQuery] = useState("");

  useEffect(() => {
    let workingRecipes = [...allRecipes];

    if (nameQuery !== "") {
      workingRecipes = workingRecipes.filter(r => {
        return r.name.toLowerCase().includes(nameQuery.toLowerCase());
      });
    }

    paginator.resetData(workingRecipes);
  }, [nameQuery]);

  function handleSearchQueryChange(newNameQuery) {
    setNameQuery(newNameQuery);
  }

  const recipesToDisplay = paginator.getDataToDisplay();

  return (
    <React.Fragment>
      <PageHeader text="Recipes" />
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper style={{ padding: 12 }}>
            <RecipeFilterForm
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
            <RecipeCardMini recipe={r} />
          </Grid>
        )) : (
          <Grid item xs={12} className="rb-no-recipe-results-container">
            <MoodBadIcon fontSize="large" />
            <Typography variant="subtitle1">
              Oh no! It looks like that food doesn't exist!
            </Typography>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}