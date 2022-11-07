import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface PaginationProviderInterface {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  getPagination: (currentPage: number, totalResults: number) => number[];
}

const getPagination = (currentPage: number, totalResults: number) => {
  const lastPage = Math.ceil(totalResults / 12);
  const pages: number[] = [];

  if (currentPage > lastPage) {
    return [];
  }

  if (lastPage <= 5) {
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  if (currentPage > 3) {
    let start = currentPage - 3 + 1;
    const end = start + 4 > lastPage ? lastPage : start + 4;

    if (end - start < 4) {
      start = end - 4;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  return [1, 2, 3, 4, 5];
};

const initialState = {
  currentPage: 1,
  setCurrentPage: () => {},
  getPagination,
};

const PaginationContext =
  createContext<PaginationProviderInterface>(initialState);

const PaginationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PaginationContext.Provider
      value={{ currentPage, setCurrentPage, getPagination }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;

export const usePagination = () => useContext(PaginationContext);
