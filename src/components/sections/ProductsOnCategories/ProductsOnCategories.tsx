import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { ItemsFilter, Pagination, SectionLayout } from "components/common";
import { ProductsGrid } from "components/ui";
import { usePagination } from "store";

const sectionStyles = {
  container: {
    margin: "0 auto",
    maxWidth: "90%",
    minHeight: "1150px",
    // display: "flex",
  },
};

interface ProductsOnCategoriesInterface {
  hasChangedCategory: boolean;
  setHasChangedCategory: Dispatch<SetStateAction<boolean>>;
}

const ProductsOnCategories: FC<ProductsOnCategoriesInterface> = ({
  hasChangedCategory,
  setHasChangedCategory,
}) => {
  const { paginated, pages, setCurrentPage } = usePagination();
  const hasItems = pages.length > 0;

  // useEffect used for setting current page to 1 and reset hasChangeCategory to false whenever the user changes category.
  useEffect(() => {
    if (hasChangedCategory) {
      setCurrentPage(1);
      setHasChangedCategory(false);
    }
  }, [hasChangedCategory, setCurrentPage, setHasChangedCategory]);

  return (
    <SectionLayout CSSProps={sectionStyles}>
      {hasItems && <ItemsFilter />}
      {paginated.length ? (
        <ProductsGrid products={paginated} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <em>No product matched your criteria.</em>
        </div>
      )}
      {hasItems && <Pagination />}
    </SectionLayout>
  );
};

export default ProductsOnCategories;
