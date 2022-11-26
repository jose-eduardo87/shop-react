import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./SidebarSortCategories.module.css";

const SidebarSortCategories: FC<{ category: string | undefined }> = ({
  category,
}) => {
  const renderCategoriesLinks = (
    <ul className={styles.list}>
      {["clothing", "accessories", "shoes", "hats"].map((categoryId, i) => (
        <Link
          key={i}
          style={{
            textDecoration: "none",
            color: category === categoryId ? "#4682B4" : "",
            fontWeight: 400,
            letterSpacing: category === categoryId ? "2px" : "1px",
          }}
          to={`/categories/${categoryId}`}
        >
          <li className={styles.link}>{categoryId}</li>
        </Link>
      ))}
    </ul>
  );

  return (
    <div className={styles.sortBox}>
      <h3>Categories</h3>
      {renderCategoriesLinks}
    </div>
  );
};

export default SidebarSortCategories;
