import { useState } from "react";

export const usePagination = (
  dataLength: number,
  defaultPage: number = 0,
  defaultLimit: string = "5"
) => {
  const [pageIndex, setPageIndex] = useState(defaultPage);
  const [numberDisplayed, setNumberDisplayed] = useState(defaultLimit);
  const maxPage = Math.floor(
    (dataLength ?? 0) / parseInt(numberDisplayed, 10) +
      ((dataLength ?? 0) % parseInt(numberDisplayed, 10) === 0 ? 0 : 1)
  );

  const changeLimit = (limit: string) => {
    setNumberDisplayed(limit);
  };

  const changePage = (page: number) => {
    if (page < 0) return;
    if (page >= maxPage) return;
    setPageIndex(page);
  };

  const props = {
    pageIndex: pageIndex,
    maxPage: maxPage,
    onChangePage: changePage,
    numberDisplayed: numberDisplayed,
    setNumberDisplayed: changeLimit,
  };

  return {
    currentPage: pageIndex,
    currentLimit: Number(numberDisplayed),
    clientValidate: (index: number) =>
      Math.floor(index / parseInt(numberDisplayed, 10)) === pageIndex,
    props,
    reset: () => changePage(0),
  };
};

export const pageDisplayedIndex = (index: number, max: number) => {
  let arr: number[] = [];
  if (max <= 8) {
    for (let i = 0; i < max; i += 1) arr.push(i);
    return arr;
  }
  switch (index) {
    case 0:
    case 1:
    case 2:
    case 3:
      arr = [0, 1, 2, 3, 4, 5, max - 1];
      break;
    case max - 1:
    case max - 2:
    case max - 3:
    case max - 4:
    case max - 5:
      arr = [0, max - 6, max - 5, max - 4, max - 3, max - 2, max - 1];
      break;
    default:
      arr = [0, index - 1, index, index + 1, index + 2, max - 1];
      break;
  }
  return arr;
};