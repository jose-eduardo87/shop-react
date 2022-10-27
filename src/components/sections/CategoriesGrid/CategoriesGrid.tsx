import { FC } from "react";
import { SectionLayout } from "components/common/index";
import { accessoriesImage, clothingImage, hatsImage, shoesImage } from "./imgs";

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

const getBackgroundStyle = (url: string, position?: string) => {
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: position,
  };
};

const CategoriesGrid: FC = () => {
  return (
    <SectionLayout id="categories" CSSProps={{ ...sectionStyles }}>
      <h2>Categories</h2>
      <div className={styles.root}>
        <div
          id={styles.clothing}
          style={getBackgroundStyle(clothingImage, "80%")}
        >
          <div className={styles.textBox}>clothing</div>
        </div>
        <div
          id={styles.accessories}
          style={getBackgroundStyle(accessoriesImage)}
        >
          <div className={styles.textBox}>accessories</div>
        </div>
        <div id={styles.shoes} style={getBackgroundStyle(shoesImage)}>
          <div className={styles.textBox}>shoes</div>
        </div>
        <div id={styles.hats} style={getBackgroundStyle(hatsImage)}>
          <div className={styles.textBox}>hats</div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default CategoriesGrid;
