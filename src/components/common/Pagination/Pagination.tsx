import { usePagination } from "store";

import styles from "./Pagination.module.css";

const shouldHideButton = (booleanExp: boolean) =>
  booleanExp ? { opacity: 0 } : { opacity: 1, border: "none" };

const Pagination = () => {
  const { currentPage, setCurrentPage, pages, totalItems, itemsQuantity } =
    usePagination();
  const renderListOfPages = pages.map((page, i) => {
    return (
      <button
        key={i}
        className={
          page === currentPage
            ? `${styles.linkButton} ${styles.currentButton}`
            : styles.linkButton
        }
        onClick={() => setCurrentPage(page!)}
      >
        {page}
      </button>
    );
  });

  return (
    <div className={styles.root}>
      <button
        disabled={currentPage === 1}
        style={shouldHideButton(currentPage === 1)}
        className={styles.linkButton}
        onClick={() => setCurrentPage((prevState) => prevState - 1)}
      >
        Previous
      </button>
      {renderListOfPages}
      <button
        disabled={currentPage === Math.ceil(totalItems / itemsQuantity)}
        style={shouldHideButton(
          currentPage === Math.ceil(totalItems / itemsQuantity)
        )}
        className={styles.linkButton}
        onClick={() => setCurrentPage((prevState) => prevState + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
