import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useCustomizeData } from "./customize-data-context";
import { ItemInterface } from "helpers/index";

interface PaginationProviderInterface {
  currentPage: number;
  paginated: ItemInterface[] | [];
  pages: Partial<number[]>;
  firstIdx: number;
  lastIdx: number;
  totalItems: number;
  itemsQuantity: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setPaginated: Dispatch<SetStateAction<ItemInterface[] | []>>;
  setItemsQuantity: Dispatch<SetStateAction<number>>;
}

const initialState = {
  currentPage: 1,
  paginated: [],
  pages: [],
  firstIdx: 0,
  lastIdx: 0,
  totalItems: 0,
  itemsQuantity: 0,
  setCurrentPage: () => {},
  setPaginated: () => {},
  setItemsQuantity: () => {},
};

const PaginationContext =
  createContext<PaginationProviderInterface>(initialState);

const PaginationProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { filteredData } = useCustomizeData(); //global state storing filtered items
  const [currentPage, setCurrentPage] = useState(1); // stores the current page
  const [paginated, setPaginated] = useState<ItemInterface[] | []>([]); // stores items corresponding to the current page
  const [itemsQuantity, setItemsQuantity] = useState(12); // stores the amount of items displayed in a page
  const [itemsPerPage, setItemsPerPage] = useState([0, 0]); // stores the first and last items of the current page
  const [pages, setPages] = useState([1]); // stores all the pages available

  // useLayoutEffect responsible for updating the current items shown on page (paginated) and the first and last items indexes
  // for the current page (itemsPerPage). The reason why I used useLayoutEffect here is to prevent items flickering when there
  // is a change in the state.
  useLayoutEffect(() => {
    const start = (currentPage - 1) * itemsQuantity;
    const end =
      start + itemsQuantity < filteredData.length
        ? start + itemsQuantity
        : filteredData.length;

    setPaginated(filteredData.slice(start, end));
    setItemsPerPage([start + 1, end]);
  }, [currentPage, itemsQuantity, filteredData]);

  // useEffect responsible for updating pages array used in the Pagination component for displaying available pages.
  useEffect(() => {
    const getPagination = (currentPage: number, totalResults: number) => {
      const lastPage = Math.ceil(totalResults / itemsQuantity);
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

    setPages(getPagination(currentPage, filteredData.length));
  }, [currentPage, filteredData.length, itemsQuantity]);

  // useEffect responsible for reseting currentPage to 1 whenever there is a change in itemsQuantity (state responsible
  // for changing the number of items).
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsQuantity]);

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        paginated,
        pages,
        firstIdx: itemsPerPage[0],
        lastIdx: itemsPerPage[1],
        totalItems: filteredData.length,
        itemsQuantity,
        setCurrentPage,
        setPaginated,
        setItemsQuantity,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;

export const usePagination = () => useContext(PaginationContext);
