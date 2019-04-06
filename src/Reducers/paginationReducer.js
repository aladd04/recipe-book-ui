export const actionType = {
  nextPage: "nextPage",
  previousPage: "previousPage",
  goToPage: "goToPage",
  reset: "reset"
}

export function reducer(state, action) {
  switch (action.type) {
    case actionType.nextPage:
      return goToPageNumber(state, state.pageNumber + 1);
    case actionType.previousPage:
      return goToPageNumber(state, state.pageNumber - 1);
    case actionType.goToPage:
      return goToPageNumber(state, action.payload);
    case actionType.reset:
    default:
      return setInitialState(action.payload);
  }
}

export function setInitialState(data) {
  const minInitialState = {
    pageSize: 6,
    data: [...data]
  };

  return goToPageNumber(minInitialState, 1);
}

function goToPageNumber(state, requestedPageNumber) {
  const maxPageNumber = Math.ceil(state.data.length / state.pageSize);
  const minPageNumber = maxPageNumber === 0 ? 0 : 1;

  let newPageNumber = requestedPageNumber;
  if (newPageNumber > maxPageNumber) {
    newPageNumber = maxPageNumber;
  } else if (newPageNumber < minPageNumber) {
    newPageNumber = minPageNumber;
  }

  const pagingStartIndex = (newPageNumber - 1) * state.pageSize;
  const pagingEndIndex =
    Math.min(state.data.length, pagingStartIndex + state.pageSize);

  return {
    pageSize: state.pageSize,
    data: state.data,
    pageNumber: newPageNumber,
    maxPageNumber: maxPageNumber,
    displayStartNumber: pagingEndIndex === 0 ? 0 : pagingStartIndex + 1,
    displayEndNumber: pagingEndIndex,
    dataToDisplay: state.data.slice(pagingStartIndex, pagingEndIndex)
  };
}