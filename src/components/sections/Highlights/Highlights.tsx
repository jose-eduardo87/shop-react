import { PageLayout } from "components/common/index";
import { ProductsGrid } from "components/ui/index";
import { ITEMS } from "helpers/constants";

import styles from "./Highlights.module.css";

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

const Highlights = () => {
  return (
    <PageLayout CSSProps={{ ...sectionStyles }}>
      <h2 className={styles.title}>Highlights</h2>
      <ProductsGrid products={ITEMS.slice(0, 5)} />
    </PageLayout>
  );
};

export default Highlights;
