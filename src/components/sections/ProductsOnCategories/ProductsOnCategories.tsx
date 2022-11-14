import { ItemsFilter, Pagination, SectionLayout } from "components/common";
import { ProductsGrid } from "components/ui";
import { usePagination } from "store";

const sectionStyles = {
  container: {
    padding: "0 1rem 0 1rem",
  },
};

const ProductsOnCategories = () => {
  const { paginated } = usePagination();

  return (
    <SectionLayout CSSProps={sectionStyles}>
      <ItemsFilter />
      <ProductsGrid products={paginated} />
      <Pagination />
    </SectionLayout>
  );
};

export default ProductsOnCategories;
