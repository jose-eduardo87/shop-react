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
}

const initialState = {
  currentPage: 1,
  setCurrentPage: () => {},
};

const PaginationContext =
  createContext<PaginationProviderInterface>(initialState);

const PaginationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;

export const usePagination = () => useContext(PaginationContext);
