import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ItemInterface } from "reducers";
import { ITEMS } from "helpers/constants";

const initialState = {
  filteredData: [],
  onSortItems: (sortType: string) => {},
};

const CustomizeDataContext = createContext<{
  filteredData: ItemInterface[] | [];
  onSortItems: (sortType: string) => void;
}>(initialState);

const CustomizeDataProvider: FC<{
  category: string | undefined;
  children: ReactNode;
}> = ({ category, children }) => {
  // memoized function to prevent recalculation whenever it's being used in useEffect
  const getFilteredItems = useCallback((category: string | undefined) => {
    const filteredItems = category
      ? ITEMS.filter((item) => item.category === category)
      : ITEMS;

    return filteredItems;
  }, []);

  const [sort, setSort] = useState("");
  // useState initially set according to what's being passed as category
  const [filteredData, setFilteredData] = useState<ItemInterface[]>(
    getFilteredItems(category)
  );
  const onSortItems = (sortType: string) => setSort(sortType);

  // useEffect responsible for filtering items whenever there is a change in 'category' props
  useEffect(() => {
    const filteredItems = getFilteredItems(category);

    setFilteredData(filteredItems);
  }, [category, getFilteredItems]);

  // useEffect responsible for making the sorting option persistent when there's a change in category
  useEffect(() => {
    if (sort) {
      const filteredDataClone = [...filteredData];
      const sortedItems =
        sort === "asc"
          ? filteredDataClone.sort((a, b) => a.price - b.price)
          : filteredDataClone.sort((a, b) => b.price - a.price);

      setFilteredData(sortedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <CustomizeDataContext.Provider value={{ filteredData, onSortItems }}>
      {children}
    </CustomizeDataContext.Provider>
  );
};

export default CustomizeDataProvider;

export const useCustomizeData = () => useContext(CustomizeDataContext);
