import {
  createContext,
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ItemInterface } from "helpers/index";
import { ITEMS } from "helpers/constants";

const initialState = {
  filteredData: [],
  sort: "",
  priceRange: [0, 999],
  onClothingAndHatSizeChange: (value: string, isChecked: boolean) => {},
  onColorChange: (value: string, isChecked: boolean) => {},
  onShoeSizeChange: (value: number) => {},
  setShouldResetParams: () => {},
  onSortItems: (sortType: string) => {},
  onFilterItems: () => {},
  setPriceRange: () => {},
};

const CustomizeDataContext = createContext<{
  filteredData: ItemInterface[] | [];
  sort: string;
  priceRange: number[];
  onClothingAndHatSizeChange: (value: string, isChecked: boolean) => void;
  onColorChange: (value: string, isChecked: boolean) => void;
  onShoeSizeChange: (value: number) => void;
  setShouldResetParams: Dispatch<SetStateAction<boolean>>;
  onSortItems: (sortType: string) => void;
  onFilterItems: () => void;
  setPriceRange: Dispatch<SetStateAction<number[]>>;
}>(initialState);

const CustomizeDataProvider: FC<{
  category: string | undefined;
  children: ReactNode;
}> = ({ category, children }) => {
  // Params storing filter values => I used useRef because I needed to keep track of the values without re-rendering
  // this context. Also, these Refs hold Set values as methods like .add(), .delete() and .has() are O(1), and give
  // better performance compared to array methods like .slice() and .indexOf() which are O(n), and I would have to use
  // them if I chose arrays over Set instead.
  const clothingAndHatSizeParamRef = useRef(new Set<string>());
  const colorParamRef = useRef(new Set<string>());
  const shoeSizeParamRef = useRef<number>();
  // sort holds the type of sorting selected: 'asc' => ascending / 'desc' => descending.
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 999]);
  const [shouldResetParams, setShouldResetParams] = useState(false);

  // memoized functions to prevent unnecessary recalculation whenever they are being used inside useEffect.
  const filterItemsByCategory = useCallback(
    (category: string | undefined): ItemInterface[] => {
      const filteredItems = category
        ? ITEMS.filter((item) => item.category === category)
        : ITEMS;

      return filteredItems;
    },
    []
  );
  const sortItems = useCallback(
    (items: ItemInterface[]) => {
      const filteredDataClone = [...items];

      sort === "asc"
        ? filteredDataClone.sort((a, b) => a.price - b.price)
        : filteredDataClone.sort((a, b) => b.price - a.price);

      return filteredDataClone;
    },
    [sort]
  );

  // utility function to update ref's storing clothing and color filter params.
  const updateCheckboxInput = (
    paramSet: MutableRefObject<Set<string>>,
    value: string,
    isChecked: boolean
  ) => {
    isChecked ? paramSet.current!.add(value) : paramSet.current.delete(value);
  };

  // useState initially set according to what's being passed as category
  const [filteredData, setFilteredData] = useState<ItemInterface[]>(
    filterItemsByCategory(category)
  );

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
    let filteredItems = filterItemsByCategory(category);
    const filterItemsByParams = (
      filterRef: MutableRefObject<Set<string | number>>,
      property: "size" | "colors"
    ) =>
      filteredItems.filter(({ additionalInfo }) =>
        additionalInfo[property]?.some((param) => filterRef.current.has(param))
      );

    if (clothingAndHatSizeParamRef.current.size) {
      filteredItems = filterItemsByParams(clothingAndHatSizeParamRef, "size");
    }
    if (shoeSizeParamRef.current) {
      const filterShoesBySize = ITEMS.filter(({ additionalInfo }) =>
        additionalInfo.size?.includes(shoeSizeParamRef.current!)
      );
      if (category || (!category && !clothingAndHatSizeParamRef.current.size)) {
        filteredItems = filterShoesBySize;
        // in case user is filtering items using no category, shoe filtered results must be concatenated with
        // previous filtered results
      } else if (!category && clothingAndHatSizeParamRef.current.size) {
        filteredItems = filteredItems.concat(filterShoesBySize);
      }
    }
    if (colorParamRef.current.size) {
      filteredItems = filterItemsByParams(colorParamRef, "colors");
    }

    filteredItems = filteredItems.filter(
      ({ price }) => price >= priceRange[0] && price <= priceRange[1]
    );

    // this statement makes possible filtered items being sorted, if there is any sorting option selected.
    if (sort) {
      filteredItems = sortItems(filteredItems);
    }

    setFilteredData(filteredItems);
  };

  // useEffect responsible for filtering items whenever there is a change in 'category' props.
  useEffect(() => {
    setFilteredData(filterItemsByCategory(category));
  }, [category, filterItemsByCategory]);

  // useEffect responsible for setting sorted items in filteredData whenever there is a change in 'sort'.
  // This useEffect guarantees that selected sorting option will be taken into consideration even when there
  // is a change in category.
  useEffect(() => {
    if (sort) {
      setFilteredData((prevState) => sortItems(prevState));
    }
  }, [category, sort, sortItems]);

  // useEffect responsible for reseting filter parameters when Filter Options is closed in SidebarFilter.
  useEffect(() => {
    if (shouldResetParams) {
      clothingAndHatSizeParamRef.current = new Set<string>();
      colorParamRef.current = new Set<string>();
      shoeSizeParamRef.current = undefined;
    }
  }, [shouldResetParams]);

  return (
    <CustomizeDataContext.Provider
      value={{
        filteredData,
        sort,
        priceRange,
        onClothingAndHatSizeChange,
        onColorChange,
        onShoeSizeChange,
        setShouldResetParams,
        onSortItems,
        onFilterItems,
        setPriceRange,
      }}
    >
      {children}
    </CustomizeDataContext.Provider>
  );
};

export default CustomizeDataProvider;

export const useCustomizeData = () => useContext(CustomizeDataContext);
