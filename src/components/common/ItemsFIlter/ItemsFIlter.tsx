import { usePagination } from "store";

import styles from "./ItemsFilter.module.css";

const ItemsFIlter = () => {
  const { firstIdx, lastIdx, totalItems } = usePagination();

  return (
    <div className={styles.root}>
      <p>
        SHOWING {firstIdx}/{lastIdx} OF {totalItems} RESULTS
      </p>
    </div>
  );
};

export default ItemsFIlter;
