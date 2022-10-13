import { FC } from "react";
import { PageLayout } from "components/common/index";

import styles from "./CategoriesGrid.module.css";

const sectionStyles = {
  root: {
    backgroundColor: "#F9F9F9",
  },
  container: {
    width: "50%",
    margin: "0 auto",
    padding: "4rem",
  },
};

const CategoriesGrid: FC = () => {
  return (
    <PageLayout CSSProps={{ ...sectionStyles }}>
      <h2>Categories</h2>
      <div className={styles.root}>
        <div id={styles.clothing}>CLOTHING</div>
        <div id={styles.accessories}>ACCESSORIES</div>
        <div id={styles.shoes}>SHOES</div>
        <div id={styles.hats}>HATS</div>
      </div>
    </PageLayout>
  );
};

export default CategoriesGrid;
