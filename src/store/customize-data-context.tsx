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
  isButtonDisabled: true,
  onClothingAndHatSizeChange: (value: string, isChecked: boolean) => {},
  onColorChange: (value: string, isChecked: boolean) => {},
  onShoeSizeChange: (value: number) => {},
  onSortItems: (sortType: string) => {},
  onFilterItems: () => {},
};

const CustomizeDataContext = createContext<{
  filteredData: ItemInterface[] | [];
  sort: string;
  isButtonDisabled: boolean;
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
  // Params storing filter values => I used useRef because I needed to keep track of the values without re-rendering
  // this context. Also, these Refs hold Set values as methods like .add(), .delete() and .has() are O(1), and give
  // better performance compared to array methods like .slice() and .indexOf() which are O(n), and I would have to use
  // them if I chose arrays over Set instead.
  const clothingAndHatSizeParamRef = useRef(new Set<string>());
  const colorParamRef = useRef(new Set<string>());
  const shoeSizeParamRef = useRef<number>();
  // sort holds the type of sorting selected: 'asc' => ascending / 'desc' => descending.
  const [sort, setSort] = useState("");
  // not working
  const isButtonDisabled =
    !clothingAndHatSizeParamRef.current.size &&
    !colorParamRef.current.size &&
    !shoeSizeParamRef.current;

  // memoized functions to prevent unnecessary recalculation whenever they are being used inside useEffect.
  const getFilteredItems = useCallback(
    (category: string | undefined): ItemInterface[] => {
      const filteredItems = category
        ? ITEMS.filter((item) => item.category === category)
        : ITEMS;

      return filteredItems;
    },
    []
  );
  const getSortedItems = useCallback(
    (items: ItemInterface[]) => {
      const filteredDataClone = [...items];

      sort === "asc"
        ? filteredDataClone.sort((a, b) => a.price - b.price)
        : filteredDataClone.sort((a, b) => b.price - a.price);

      return filteredDataClone;
    },
    [sort]
  );
  const updateCheckboxInput = (
    paramSet: MutableRefObject<Set<string>>,
    value: string,
    isChecked: boolean
  ) => {
    isChecked ? paramSet.current!.add(value) : paramSet.current.delete(value);
  };

  // useState initially set according to what's being passed as category
  const [filteredData, setFilteredData] = useState<ItemInterface[]>(
    getFilteredItems(category)
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
    let filteredItems = getFilteredItems(category);
    const manageFilteredItems = (
      filterRef: MutableRefObject<Set<string | number>>,
      property: "size" | "colors"
    ) =>
      filteredItems.filter(({ additionalInfo }) =>
        additionalInfo[property]?.some((property) =>
          filterRef.current.has(property)
        )
      );

    // should I create a recursive function to avoid this amount of if?
    if (clothingAndHatSizeParamRef.current.size) {
      filteredItems = manageFilteredItems(clothingAndHatSizeParamRef, "size");
    }
    if (colorParamRef.current.size) {
      filteredItems = manageFilteredItems(colorParamRef, "colors");
    }
    if (shoeSizeParamRef.current) {
      filteredItems = filteredItems.filter(({ additionalInfo }) =>
        additionalInfo.size?.includes(shoeSizeParamRef.current!)
      );
    }

    // this statement will make possible filtered items being sorted, if there is any sorting option selected.
    if (sort) {
      filteredItems = getSortedItems(filteredItems);
    }

    setFilteredData(filteredItems);
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
      setFilteredData((prevState) => getSortedItems(prevState));
    }
  }, [category, sort, getSortedItems]);

  return (
    <CustomizeDataContext.Provider
      value={{
        filteredData,
        sort,
        isButtonDisabled,
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
