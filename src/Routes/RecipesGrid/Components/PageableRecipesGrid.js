import {
  actionType,
  reducer,
  setInitialState
} from "../../../Reducers/paginationReducer";
import { ClientSidePaginator } from "../../../Shared/ClientSidePaginator";
import { RecipeGridCard } from "./RecipeGridCard";
import React, {
  useEffect,
  useReducer
} from "react";
import {
  Grid,
  Typography
} from "@material-ui/core";
import MoodBadIcon from "@material-ui/icons/MoodBad";

export function PageableRecipesGrid({ recipes }) {
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(),
    setInitialState
  );

  useEffect(() => {
    dispatch({ type: actionType.reset, payload: createInitialState() });
  }, [recipes]);

  function createInitialState() {
    return {
      pageSize: 6,
      data: [...recipes]
    };
  }

  function goToNextPage() {
    dispatch({ type: actionType.nextPage });
  }

  function goToPreviousPage() {
    dispatch({ type: actionType.previousPage });
  }
    
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <ClientSidePaginator
          decrementPageNumber={goToPreviousPage}
          displayStartNumber={state.displayStartNumber}
          displayEndNumber={state.displayEndNumber}
          dataCount={state.data.length}
          currentPageNumber={state.pageNumber}
          maxPageNumber={state.maxPageNumber}
          incrementPageNumber={goToNextPage} />
      </Grid>
      {recipes.length > 0 ? state.dataToDisplay.map(r => (
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
          decrementPageNumber={goToPreviousPage}
          displayStartNumber={state.displayStartNumber}
          displayEndNumber={state.displayEndNumber}
          dataCount={state.data.length}
          currentPageNumber={state.pageNumber}
          maxPageNumber={state.maxPageNumber}
          incrementPageNumber={goToNextPage} />
      </Grid>
    </React.Fragment>
  );
}
