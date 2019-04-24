import { useRecipeService } from "../../Hooks/useRecipeService";
import { PageHeader } from "../../Shared/PageHeader";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import { RecipeInfo } from "./Components/RecipeInfo";
import { RecipeViewActions } from "./Components/RecipeViewActions";
import React, {
  useState,
  useEffect
} from "react";
import { Paper } from "@material-ui/core";

export function RecipeView(props) {
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({ name: "" });
  const [ownerBlurb, setOwnerBlurb] = useState("");

  useEffect(() => {
    setIsLoading(true);
    recipeService.getRecipeById(props.match.params.id, (response) => {
      setRecipe(response.data);
      setIsLoading(false);
    }, (error) => {
      if (error.response.status === 404) {
        props.history.push("/notfound");
      }
    });
  }, []);

  function editRecipe() {
    props.history.push(`/recipe/${recipe.id}/edit`);
  }

  function deleteRecipe() {
    // TODO: Use Material-UI modal
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      recipeService.deleteRecipe(recipe.id, (response) => {
        if (response && response.status === 200) {
          props.history.push("/");
          // TODO: Redirect to all recipes page and show a message
        } else {
          console.log(response);
        }
      }, (error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 404) {
            props.history.push("/notfound");
          }
        }
      });
    }
  }

  return (
    <React.Fragment>
      <PageHeader text={recipe.name} subText={ownerBlurb} />
      <LoadingWrapper isLoading={isLoading}>
        <Paper style={{ padding: 12 }}>
          <RecipeInfo recipe={recipe} setOwnerBlurb={setOwnerBlurb} />
          <RecipeViewActions
            editRecipe={editRecipe}
            deleteRecipe={deleteRecipe} />
        </Paper>
      </LoadingWrapper>
    </React.Fragment>
  );
}
