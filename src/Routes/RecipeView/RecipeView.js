import { SiteMessageContext } from "../../Contexts/SiteMessageContext";
import { useRecipeService } from "../../Hooks/useRecipeService";
import { PageHeader } from "../../Shared/PageHeader";
import { LoadingWrapper } from "../../Shared/LoadingWrapper";
import { RecipeInfo } from "./Components/RecipeInfo";
import { RecipeViewActions } from "./Components/RecipeViewActions";
import YesNoModal from "../../Shared/YesNoModal";
import React, {
  useState,
  useEffect,
  useContext
} from "react";
import { Paper } from "@material-ui/core";

export function RecipeView(props) {
  const [, setSiteMessage] = useContext(SiteMessageContext);
  const recipeService = useRecipeService();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState({ name: "" });
  const [ownerBlurb, setOwnerBlurb] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (props.location.state && props.location.state.alertMessage) {
      setSiteMessage(props.location.state.alertMessage);
    }

    recipeService.getRecipeById(props.match.params.id, (response) => {
      setRecipe(response.data);
      setIsLoading(false);
    }, (error) => {
      if (error.response.status === 404) {
        props.history.push("/notfound");
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function confirmDeleteRequest() {
    setIsModalOpen(true);
  }

  function onNoModal() {
    setIsModalOpen(false);
  }

  function editRecipe() {
    props.history.push(`/recipe/${recipe.id}/edit`);
  }

  function onDeleteConfirmed() {
    setIsModalOpen(false);
    recipeService.deleteRecipe(recipe.id, (response) => {
      if (response && response.status === 200) {
        props.history.push("/", { 
          alertMessage: "Recipe Deleted!"
        });
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

  return (
    <React.Fragment>
      <PageHeader text={recipe.name} subText={ownerBlurb} />
      <LoadingWrapper isLoading={isLoading}>
        <Paper style={{ padding: 12 }}>
          <RecipeInfo recipe={recipe} setOwnerBlurb={setOwnerBlurb} />
          <RecipeViewActions
            editRecipe={editRecipe}
            deleteRecipe={confirmDeleteRequest} />
        </Paper>
        <YesNoModal
          isOpen={isModalOpen}
          title="Delete Recipe"
          question={`Are you sure you want to delete ${recipe.name}?`}
          onYes={onDeleteConfirmed}
          onNo={onNoModal} />
      </LoadingWrapper>
    </React.Fragment>
  );
}
