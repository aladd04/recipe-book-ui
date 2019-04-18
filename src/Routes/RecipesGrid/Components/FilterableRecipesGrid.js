import { RecipesFilterForm } from "./RecipesFilterForm";
import { PageableRecipesGrid } from "./PageableRecipesGrid";
import React, {
  useState,
  useEffect
} from "react";
import {
  Grid,
  Paper
} from "@material-ui/core";

export function FilterableRecipesGrid({ allRecipes }) {
  const [matchingRecipes, setMatchingRecipes] = useState([...allRecipes]);
  const [nameQuery, setNameQuery] = useState("");

  useEffect(() => {
    let workingRecipes = [...allRecipes];

    if (nameQuery !== "") {
      workingRecipes = workingRecipes.filter(r => {
        return r.name.toLowerCase().includes(nameQuery.toLowerCase());
      });
    }

    sortRecipesByName(workingRecipes);

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

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Paper style={{ padding: 12 }}>
          <RecipesFilterForm
            nameQuery={nameQuery}
            handleSearchQueryChange={handleSearchQueryChange} />
        </Paper>
      </Grid>
      <PageableRecipesGrid recipes={matchingRecipes} />
    </Grid>
  );
}
