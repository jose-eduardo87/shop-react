import { FC } from "react";
import { PageLayout } from "components/common/index";
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
    <PageLayout CSSProps={{ ...sectionStyles }}>
      <h2>{title}</h2>
      <ProductsGrid products={products} />
    </PageLayout>
  );
};

export default Products;
