import { usePagination } from "store";

import styles from "./Pagination.module.css";

const Pagination = () => {
  const { currentPage, setCurrentPage, getPagination } = usePagination();

  return (
    <div style={{ textAlign: "right" }}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prevState) => prevState - 1)}
      >
        BACK
      </button>
      {getPagination(currentPage, 72).map((page) => {
        if (page === currentPage) {
          return (
            <button
              className={`${styles.linkButton} ${styles.currentButton}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        }

        return (
          <button
            className={styles.linkButton}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button>FORWARD</button>
    </div>
  );
};

export default Pagination;
