import {
  useState,
  useEffect
} from "react";

export default function useClientSidePagination(pageSize) {
  const [dataCount, setDataCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(0);
  const [displayStartNumber, setDisplayStartNumber] = useState(0);
  const [displayEndNumber, setDisplayEndNumber] = useState(0);

  useEffect(() => {
    const pagingStartIndex = (pageNumber - 1) * pageSize;
    const pagingEndIndex = Math.min(dataCount, pagingStartIndex + pageSize);

    setDisplayStartNumber(pagingEndIndex === 0 ? 0 : pagingStartIndex + 1);
    setDisplayEndNumber(pagingEndIndex);
    setMaxPageNumber(Math.ceil(dataCount / pageSize));
  });

  function decrementPageNumber() {
    goToPageNumber(pageNumber - 1);
  }

  function incrementPageNumber() {
    goToPageNumber(pageNumber + 1);
  }

  function goToPageNumber(requestedPageNumber) {
    const minPageNumber = maxPageNumber === 0 ? 0 : 1;

    let newPageNumber = requestedPageNumber;
    if (newPageNumber > maxPageNumber) {
      newPageNumber = maxPageNumber;
    } else if (newPageNumber < minPageNumber) {
      newPageNumber = minPageNumber;
    }

    setPageNumber(newPageNumber);
  }

  function handleNewDataReceived(newDataCount) {
    const newPageNumber = newDataCount === 0 ? 0 : 1;

    setDataCount(newDataCount);
    setPageNumber(newPageNumber);
  }

  function getDataToDisplay(data) {
    const startNumber = displayStartNumber === 0 ? 0 : displayStartNumber - 1;
    return data.slice(startNumber, displayEndNumber);
  }
  
  return {
    maxPageNumber,
    pageNumber,
    displayStartNumber,
    displayEndNumber,
    decrementPageNumber,
    incrementPageNumber,
    goToPageNumber,
    handleNewDataReceived,
    dataCount,
    getDataToDisplay
  };
}