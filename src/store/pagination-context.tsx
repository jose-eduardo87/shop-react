import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ItemInterface } from "reducers";

interface PaginationProviderInterface {
  currentPage: number;
  paginated: ItemInterface[] | [];
  pages: Partial<number[]>;
  firstIdx: number;
  lastIdx: number;
  totalItems: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
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
  paginated: [],
  pages: [],
  firstIdx: 0,
  lastIdx: 0,
  totalItems: 0,
  setCurrentPage: () => {},
};

const PaginationContext =
  createContext<PaginationProviderInterface>(initialState);

const PaginationProvider: FC<{
  paginate: ItemInterface[];
  children: ReactNode;
}> = ({ paginate, children }) => {
  const [currentPage, setCurrentPage] = useState(1); // stores the current page
  const [paginated, setPaginated] = useState<ItemInterface[] | []>([]); // stores items corresponding to the current page
  const [itemsPerPage, setItemsPerPage] = useState([0, 0]); // stores the first and last items of the current page
  const [pages, setPages] = useState([1]); // stores all the pages available

  useEffect(() => {
    const start = (currentPage - 1) * 12,
      end = start + 12 < paginate.length ? start + 12 : paginate.length;

    setPaginated(paginate.slice(start, end));
    setItemsPerPage([start + 1, end]);
    setPages(getPagination(currentPage, paginate.length));
  }, [currentPage, paginate]);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        paginated,
        pages,
        firstIdx: itemsPerPage[0],
        lastIdx: itemsPerPage[1],
        totalItems: paginate.length,
        setCurrentPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;

export const usePagination = () => useContext(PaginationContext);
