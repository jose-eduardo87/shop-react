import { usePagination } from "store";

const Pagination = () => {
  const { currentPage } = usePagination();

  return <div style={{ textAlign: "right" }}>PAGINATION {currentPage}</div>;
};

export default Pagination;
