import { SectionLayout, Pagination } from "components/common";
import { ProductsGrid } from "components/ui";
import { ITEMS } from "helpers/constants";

const sectionStyles = {
  container: {
    padding: "0 1rem 0 1rem",
  },
};

const ProductsOnCategories = () => {
  return (
    <SectionLayout CSSProps={sectionStyles}>
      <ProductsGrid products={ITEMS.slice(0, 12)} />
      <Pagination />
    </SectionLayout>
  );
};

export default ProductsOnCategories;
