import { ChangeEvent } from "react";
import { SidebarFilterInput } from "components/ui";
import { usePagination, useCustomizeData } from "store";

import styles from "./ItemsFilter.module.css";

const ItemsFIlter = () => {
  const {
    firstIdx,
    lastIdx,
    totalItems,
    itemsQuantity,
    setCurrentPage,
    setItemsQuantity,
  } = usePagination();
  const { sort, onSortItems } = useCustomizeData();
  const onItemsPerPageChangeHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    setItemsQuantity(+e.currentTarget.value);
  const onSortItemsChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    // setting currentPage to 1 will trigger the useEffect in pagination-context for the correct recalculation of items/pages/indexes.
    setCurrentPage(1);
    onSortItems(e.currentTarget.value);
  };

  return (
    <div className={styles.root}>
      <p>
        SHOWING {firstIdx}/{lastIdx} OF {totalItems} RESULTS
      </p>
      <label
        htmlFor="items-page"
        title="Choose how many items should be displayed in the page."
        className={styles.label}
      >
        Items per page:{" "}
      </label>
      <select
        id="items-page"
        className={styles.sortOptions}
        defaultValue={itemsQuantity}
        onChange={onItemsPerPageChangeHandler}
      >
        {[
          { option: "12", value: 12 },
          { option: "24", value: 24 },
          { option: "36", value: 36 },
        ].map((input, i) => (
          <SidebarFilterInput key={i} inputType="option" inputOption={input} />
        ))}
      </select>
      <label
        htmlFor="sort-items"
        title="Choose an option to sort items."
        className={styles.label}
      >
        Sort items:{" "}
      </label>
      <select
        id="sort-items"
        className={styles.sortOptions}
        defaultValue={"" || sort}
        onChange={onSortItemsChangeHandler}
      >
        <option value="" disabled>
          Choose an option
        </option>
        {[
          { option: "Ascending price", value: "asc" },
          { option: "Descending price", value: "desc" },
        ].map((input, i) => (
          <SidebarFilterInput key={i} inputType="option" inputOption={input} />
        ))}
      </select>
    </div>
  );
};

export default ItemsFIlter;
