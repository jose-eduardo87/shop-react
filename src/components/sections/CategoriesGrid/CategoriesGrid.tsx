import { FC } from "react";
import { Link } from "react-router-dom";
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
        <Link id={styles.clothing} to="/categories/clothing">
          <div style={getBackgroundStyle(clothingImage, "80%")}>
            <div className={styles.textBox}>clothing</div>
          </div>
        </Link>
        <Link id={styles.accessories} to="/categories/accessories">
          <div style={getBackgroundStyle(accessoriesImage)}>
            {/* <img alt="Accessories" src={accessoriesImage} /> */}
            <div className={styles.textBox}>accessories</div>
          </div>
        </Link>
        <Link id={styles.shoes} to="/categories/shoes">
          <div id={styles.shoes} style={getBackgroundStyle(shoesImage)}>
            <div className={styles.textBox}>shoes</div>
          </div>
        </Link>
        <Link id={styles.hats} to="/categories/hats">
          <div id={styles.hats} style={getBackgroundStyle(hatsImage)}>
            <div className={styles.textBox}>hats</div>
          </div>
        </Link>
      </div>
    </SectionLayout>
  );
};

export default CategoriesGrid;
