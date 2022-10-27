import { FC } from "react";
import { SectionLayout } from "components/common/index";
import { ProductsGrid } from "components/ui/index";
import { ItemInterface } from "reducers";

const sectionStyles = {
  root: {
    backgroundColor: "#F9F9F9",
  },
  container: {
    width: "65%",
    margin: "0 auto",
    paddingBottom: "2rem",
  },
};

interface ProductsSectionInterface {
  title: string;
  products: ItemInterface[];
}

const Products: FC<ProductsSectionInterface> = ({ title, products }) => {
  return (
    <SectionLayout CSSProps={{ ...sectionStyles }}>
      <h2>{title}</h2>
      <ProductsGrid products={products} />
    </SectionLayout>
  );
};

export default Products;
