import useClientSidePagination from "../Hooks/useClientSidePagination";
import { PageHeader } from "../Helpers/PageHeader";
import { ClientSidePaginator } from "../Helpers/ClientSidePaginator";
import { RecipeFilterForm } from "./RecipeFilterForm";
import { RecipeCardMini } from "./RecipeCardMini";
import { getAllRecipes } from "./recipeService";

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
  const [allRecipes] = useState(() => { return getAllRecipes(); });
  const [nameQuery, setNameQuery] = useState("");
  const [pageSize] = useState(6);
  const paginator = useClientSidePagination(pageSize);

  useEffect(() => {
    let workingRecipes = [...allRecipes];

    if (nameQuery !== "") {
      workingRecipes = workingRecipes.filter(r => {
        return r.Name.toLowerCase().includes(nameQuery.toLowerCase());
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
          <Grid item md={4} sm={6} xs={12} key={r.Id}>
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