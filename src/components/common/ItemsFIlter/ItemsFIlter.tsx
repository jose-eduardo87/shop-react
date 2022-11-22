import { SidebarFilterInput } from "components/ui";
import { usePagination } from "store";

import styles from "./ItemsFilter.module.css";

const ItemsFIlter = () => {
  const { firstIdx, lastIdx, totalItems, setItemsQuantity } = usePagination();

  return (
    <div className={styles.root}>
      <button onClick={() => setItemsQuantity((prevState) => prevState + 12)}>
        +
      </button>
      <p>
        SHOWING {firstIdx}/{lastIdx} OF {totalItems} RESULTS
      </p>
      <select className={styles.sortOptions}>
        {["Items per page", 12, 24, 36, 48].map((input, i) => (
          <SidebarFilterInput
            key={i}
            inputType="option"
            value={input}
            disabledItem="Items per page"
          />
        ))}
      </select>
      <select className={styles.sortOptions}>
        {["Sort items", "Ascending price", "Descending price"].map(
          (input, i) => (
            <SidebarFilterInput
              key={i}
              inputType="option"
              value={input}
              disabledItem="Sort items"
            />
          )
        )}
      </select>
    </div>
  );
};

export default ItemsFIlter;
