import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarFilterInput } from "components/ui/index";

import styles from "./SidebarFilter.module.css";

const SidebarFilter: FC<{ category: string | undefined }> = ({ category }) => {
  const [inputValue, setInputValue] = useState([160, 640]);
  const renderCategoriesLinks = (
    <ul className={styles.list}>
      {["clothing", "accessories", "shoes", "hats"].map((categoryId, i) => (
        <Link
          key={i}
          style={{
            textDecoration: "none",
            color: category === categoryId ? "#4682B4" : "",
            fontWeight: category === categoryId ? 600 : 100,
            letterSpacing: category === categoryId ? "2px" : "1px",
          }}
          to={`/categories/${categoryId}`}
        >
          <li className={styles.link}>{categoryId}</li>
        </Link>
      ))}
    </ul>
  );
  const renderClothingSizeInput = (
    <ul className={styles.list}>
      {["X-Small", "Small", "Medium", "Large", "X-Large"].map((input, i) => (
        <SidebarFilterInput key={i} inputType="checkbox" value={input} />
      ))}
    </ul>
  );
  const renderShoeSizeInput = (
    <select className={styles.shoeSizes}>
      {[38, 39, 40, 41, 42].map((input, i) => (
        <SidebarFilterInput key={i} inputType="option" value={input} />
      ))}
    </select>
  );
  const renderColorInput = (
    <>
      <ul className={styles.list}>
        {["Green", "Red", "Blue", "White", "Black"].map((color, i) => (
          <SidebarFilterInput key={i} inputType="checkbox" value={color} />
        ))}
      </ul>
    </>
  );
  const renderPriceRangeInput = (
    <>
      <SidebarFilterInput
        inputType="range"
        value={1}
        onChange={setInputValue}
      />
      <p>
        Range:{" "}
        <span className={styles.priceRange}>
          $ {inputValue[0]} - $ {inputValue[1]}
        </span>
      </p>
    </>
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterBox}>
        <h3>Categories</h3>
        {renderCategoriesLinks}
      </div>
      {category !== "accessories" && category !== "shoes" && (
        <div className={styles.filterBox}>
          <h3>Clothing & Hat Sizing</h3>
          {renderClothingSizeInput}
        </div>
      )}
      {(category === "shoes" || !category) && (
        <div className={styles.filterBox}>
          <h3>Shoe Size</h3>
          {renderShoeSizeInput}
        </div>
      )}
      <div className={styles.filterBox}>
        <h3>Color</h3>
        {renderColorInput}
      </div>
      <div className={styles.priceBox}>
        <h3>Price Filter</h3>
        {renderPriceRangeInput}
      </div>
    </aside>
  );
};

export default SidebarFilter;
