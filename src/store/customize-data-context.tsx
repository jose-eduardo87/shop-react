import {
  createContext,
  FC,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ItemInterface } from "reducers";
import { ITEMS } from "helpers/constants";

const initialState = {
  filteredData: [],
  sort: "",
  onClothingAndHatSizeChange: (value: string, isChecked: boolean) => {},
  onColorChange: (value: string, isChecked: boolean) => {},
  onShoeSizeChange: (value: number) => {},
  onSortItems: (sortType: string) => {},
  onFilterItems: () => {},
};

const CustomizeDataContext = createContext<{
  filteredData: ItemInterface[] | [];
  sort: string;
  onClothingAndHatSizeChange: (value: string, isChecked: boolean) => void;
  onColorChange: (value: string, isChecked: boolean) => void;
  onShoeSizeChange: (value: number) => void;
  onSortItems: (sortType: string) => void;
  onFilterItems: () => void;
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

  // Params storing filter values => I used useRef because I needed to keep track of the values without re-rendering
  // this context. Also, these Refs hold Set values as methods like .add(), .delete() and .has() are O(1), and give
  // better performance compared to array methods like .slice() and .indexOf(), which are O(n).
  const clothingAndHatSizeParamRef = useRef(new Set<string>());
  const colorParamRef = useRef(new Set<string>());
  const shoeSizeParamRef = useRef<number>();
  const [sort, setSort] = useState("");
  // useState initially set according to what's being passed as category
  const [filteredData, setFilteredData] = useState<ItemInterface[]>(
    getFilteredItems(category)
  );
  const updateCheckboxInput = (
    paramSet: MutableRefObject<Set<string>>,
    value: string,
    isChecked: boolean
  ) => {
    isChecked ? paramSet.current!.add(value) : paramSet.current.delete(value);
  };
  const onClothingAndHatSizeChange = (value: string, isChecked: boolean) => {
    updateCheckboxInput(clothingAndHatSizeParamRef, value, isChecked);
  };
  const onShoeSizeChange = (value: number) => {
    shoeSizeParamRef.current = value;
  };
  const onColorChange = (value: string, isChecked: boolean) => {
    updateCheckboxInput(colorParamRef, value, isChecked);
  };
  const onSortItems = (sortType: string) => setSort(sortType);
  const onFilterItems = () => {
    let itemsClone = getFilteredItems(category);

    if (clothingAndHatSizeParamRef.current.size) {
      // even though the above chain of methods may look an aberration at first sight in terms of time complexity,
      // it actually is a very performant one as .filter and .some are 0(n), and .has is O(1).
      itemsClone = itemsClone.filter(({ additionalInfo }) =>
        additionalInfo.size?.some((size) =>
          clothingAndHatSizeParamRef.current.has(size)
        )
      );
    }

    setFilteredData(itemsClone);
  };

  // useEffect responsible for filtering items whenever there is a change in 'category' props.
  useEffect(() => {
    setFilteredData(getFilteredItems(category));
  }, [category, getFilteredItems]);

  // useEffect responsible for setting sorted items in filteredData whenever there is a change in 'sort'.
  // This useEffect guarantees that selected sorting option will be taken into consideration even when there
  // is a change in category.
  useEffect(() => {
    if (sort) {
      const getSortedItems = (prevState: ItemInterface[]) => {
        // mandatory to use prevState as React guarantees it is going to be the most recent state.
        const filteredDataClone = [...prevState];

        sort === "asc"
          ? filteredDataClone.sort((a, b) => a.price - b.price)
          : filteredDataClone.sort((a, b) => b.price - a.price);

        return filteredDataClone;
      };

      setFilteredData((prevState) => getSortedItems(prevState));
    }
  }, [category, sort, getFilteredItems]);

  return (
    <CustomizeDataContext.Provider
      value={{
        filteredData,
        sort,
        onClothingAndHatSizeChange,
        onColorChange,
        onShoeSizeChange,
        onSortItems,
        onFilterItems,
      }}
    >
      {children}
    </CustomizeDataContext.Provider>
  );
};

export default CustomizeDataProvider;

export const useCustomizeData = () => useContext(CustomizeDataContext);
