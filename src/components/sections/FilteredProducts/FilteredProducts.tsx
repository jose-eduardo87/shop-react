import { SectionLayout } from "components/common";
// import { ProductCard } from "components/ui";
// import { ITEMS } from "helpers/constants";

const sectionStyles = {
  container: {
    padding: "0 1rem 0 1rem",
    border: "1px solid red",
  },
};

const FilteredProducts = () => {
  return (
    <SectionLayout CSSProps={sectionStyles}>
      <h1>PRODUCTS SECTION</h1>
    </SectionLayout>
  );
};

export default FilteredProducts;
