import {
  useState,
  useEffect
} from "react";

export default function useClientSidePagination(pageSize) {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayStartNumber, setDisplayStartNumber] = useState(0);
  const [displayEndNumber, setDisplayEndNumber] = useState(0);

  useEffect(() => {
    const pagingStartIndex = (pageNumber - 1) * pageSize;
    const pagingEndIndex = Math.min(data.length, pagingStartIndex + pageSize);

    setDisplayStartNumber(pagingEndIndex === 0 ? 0 : pagingStartIndex + 1);
    setDisplayEndNumber(pagingEndIndex);
  });

  function decrementPageNumber() {
    goToPageNumber(pageNumber - 1);
  }

  function incrementPageNumber() {
    goToPageNumber(pageNumber + 1);
  }

  function goToPageNumber(requestedPageNumber) {
    const maxPageNumber = getMaxPageNumber();
    const minPageNumber = 1;

    let newPageNumber = requestedPageNumber;
    if (newPageNumber > maxPageNumber) {
      newPageNumber = maxPageNumber;
    } else if (newPageNumber < minPageNumber) {
      newPageNumber = minPageNumber;
    }

    setPageNumber(newPageNumber);
  }

  function getMaxPageNumber() {
    return Math.ceil(data.length / pageSize);
  }

  function resetData(newData) {
    const newPageNumber = newData.length === 0 ? 0 : 1;

    setData(newData);
    setPageNumber(newPageNumber);
  }

  function getDataToDisplay() {
    const startNumber = displayStartNumber === 0 ? 0 : displayStartNumber - 1;
    return data.slice(startNumber, displayEndNumber);
  }
  
  return {
    maxPageNumber: getMaxPageNumber(),
    pageNumber,
    displayStartNumber,
    displayEndNumber,
    decrementPageNumber,
    incrementPageNumber,
    goToPageNumber,
    resetData,
    dataCount: data.length,
    getDataToDisplay
  };
}