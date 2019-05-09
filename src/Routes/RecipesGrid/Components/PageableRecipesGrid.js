import {
  actionType,
  reducer,
  setInitialState
} from "../../../Reducers/paginationReducer";
import { ClientSidePaginator } from "../../../Shared/ClientSidePaginator";
import { RecipeGridCard } from "./RecipeGridCard";
import React, {
  useEffect,
  useReducer,
  useCallback
} from "react";
import {
  Grid,
  Typography
} from "@material-ui/core";
import MoodBadIcon from "@material-ui/icons/MoodBad";

export function PageableRecipesGrid({ recipes }) {
  const createInitialStateCallback = useCallback(() => {
    return {
      pageSize: 6,
      data: [...recipes]
    };
  }, [recipes]);

  const [state, dispatch] = useReducer(
    reducer,
    createInitialStateCallback(),
    setInitialState
  );

  useEffect(() => {
    dispatch({ type: actionType.reset, payload: createInitialStateCallback() });
  }, [createInitialStateCallback]);

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
