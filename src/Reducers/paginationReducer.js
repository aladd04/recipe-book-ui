export const actionType = {
  nextPage: "nextPage",
  previousPage: "previousPage",
  reset: "reset"
}

export function reducer(state, action) {
  switch (action.type) {
    case actionType.nextPage:
      return goToPageNumber(state, state.pageNumber + 1);
    case actionType.previousPage:
      return goToPageNumber(state, state.pageNumber - 1);
    case actionType.reset:
    default:
      return setInitialState(action.payload);
  }
}

export function setInitialState(initialState) {
  return goToPageNumber(initialState, 1);
}

function goToPageNumber(state, requestedPageNumber) {
  const maxPageNumber = state.pageSize === 0
    ? 0
    : Math.ceil(state.data.length / state.pageSize);

  const minPageNumber = maxPageNumber === 0 ? 0 : 1;

  if (requestedPageNumber > maxPageNumber) {
    requestedPageNumber = maxPageNumber;
  } else if (requestedPageNumber < minPageNumber) {
    requestedPageNumber = minPageNumber;
  }

  const pagingStartIndex =
    Math.max(0, (requestedPageNumber - 1) * state.pageSize);

  const pagingEndIndex =
    Math.min(state.data.length, pagingStartIndex + state.pageSize);

  return {
    pageSize: state.pageSize,
    data: state.data,
    pageNumber: requestedPageNumber,
    maxPageNumber: maxPageNumber,
    displayStartNumber: pagingEndIndex === 0 ? 0 : pagingStartIndex + 1,
    displayEndNumber: pagingEndIndex,
    dataToDisplay: state.data.slice(pagingStartIndex, pagingEndIndex)
  };
}