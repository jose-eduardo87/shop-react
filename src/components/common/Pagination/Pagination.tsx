import { usePagination } from "store";

import styles from "./Pagination.module.css";

const shouldHideButton = (booleanExp: boolean) =>
  booleanExp ? { opacity: 0 } : { opacity: 1 };

const Pagination = () => {
  const { currentPage, setCurrentPage, pages } = usePagination();
  const renderPagination = pages.map((page, i) => {
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
      {renderPagination}
      <button
        disabled={currentPage === Math.ceil(31 / 12)}
        style={shouldHideButton(currentPage === Math.ceil(31 / 12))}
        className={styles.linkButton}
        onClick={() => setCurrentPage((prevState) => prevState + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
