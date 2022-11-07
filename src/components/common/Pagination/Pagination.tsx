import { usePagination } from "store";

import styles from "./Pagination.module.css";

const Pagination = () => {
  const { currentPage, setCurrentPage, getPagination } = usePagination();

  return (
    <div className={styles.root}>
      <button
        disabled={currentPage === 1}
        className={styles.linkButton}
        onClick={() => setCurrentPage((prevState) => prevState - 1)}
      >
        Previous
      </button>
      {getPagination(currentPage, 72).map((page, i) => {
        if (page === currentPage) {
          return (
            <button
              key={i}
              className={`${styles.linkButton} ${styles.currentButton}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        }

        return (
          <button
            key={i}
            className={styles.linkButton}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage === 72 / 12}
        className={styles.linkButton}
        onClick={() => setCurrentPage((prevState) => prevState + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
