import useRecipeService from "../../Hooks/useRecipeService";
import { PageHeader } from "../../Helpers/PageHeader";
import { LoadingWrapper } from "../../Helpers/LoadingWrapper";
import { RouterLink } from "../../Helpers/RouterLink";
import { RecipeInfo } from "./Components/RecipeInfo";

import React, {
  useState,
  useEffect
} from "react";
import {
  Paper,
  Button
} from "@material-ui/core";

export function RecipeView(props) {
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({ name: "View Recipe" });
  const [ownerBlurb, setOwnerBlurb] = useState("");

  useEffect(() => {
    setIsLoading(true);
    recipeService.getRecipeById(props.match.params.id, (response) => {
      setRecipe(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <React.Fragment>
      <PageHeader text={recipe.name} subText={ownerBlurb} />
      <LoadingWrapper isLoading={isLoading}>
        <Paper style={{ padding: 12 }}>
          <RecipeInfo recipe={recipe} setOwnerBlurb={setOwnerBlurb} />
          <RouterLink to="/">
            <Button size="small" color="primary">
              To All Recipes
            </Button>
          </RouterLink>
        </Paper>
      </LoadingWrapper>
    </React.Fragment>
  );
}