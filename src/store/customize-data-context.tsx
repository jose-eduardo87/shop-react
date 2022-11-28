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
  sort: "",
  onClothingAndHatSizeChange: (value: string, isChecked: boolean) => {},
  onSortItems: (sortType: string) => {},
};

const CustomizeDataContext = createContext<{
  filteredData: ItemInterface[] | [];
  sort: string;
  onClothingAndHatSizeChange: (value: string, isChecked: boolean) => void;
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

  // arrays storing filter values => probably gotta use useState
  const clothingAndHatSizeParam: Partial<string[]> = [];

  const [sort, setSort] = useState("");
  // useState initially set according to what's being passed as category
  const [filteredData, setFilteredData] = useState<ItemInterface[]>(
    getFilteredItems(category)
  );
  const onClothingAndHatSizeChange = (value: string, isChecked: boolean) => {
    if (!isChecked) {
      const itemIndex = clothingAndHatSizeParam.indexOf(value);

      clothingAndHatSizeParam.splice(itemIndex, 1);
    } else {
      clothingAndHatSizeParam.push(value);
    }
  };
  // const onShoeSizeChange = () => {};
  // const onColorChange = () => {};
  // const onPriceChange = () => {};
  const onSortItems = (sortType: string) => setSort(sortType);

  // useEffect responsible for filtering items whenever there is a change in 'category' props.
  // It still takes sorting into consideration, sorting items if there is any sorting option selected.
  useEffect(() => {
    let filteredItems = getFilteredItems(category);

    if (sort) {
      const filteredItemsClone = [...filteredItems];
      sort === "asc"
        ? filteredItemsClone.sort((a, b) => a.price - b.price)
        : filteredItemsClone.sort((a, b) => b.price - a.price);

      filteredItems = filteredItemsClone;
    }

    setFilteredData(filteredItems);
  }, [category, getFilteredItems, sort]);

  return (
    <CustomizeDataContext.Provider
      value={{ filteredData, sort, onClothingAndHatSizeChange, onSortItems }}
    >
      {children}
    </CustomizeDataContext.Provider>
  );
};

export default CustomizeDataProvider;

export const useCustomizeData = () => useContext(CustomizeDataContext);
