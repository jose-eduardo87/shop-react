import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarFilterInput } from "components/ui/index";

import styles from "./SidebarFilter.module.css";

const SidebarFilter: FC<{ category: string | undefined }> = ({ category }) => {
  const [inputValue, setInputValue] = useState([160, 640]);
  const renderCategoriesLinks = (
    <>
      <h3>Categories</h3>
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
    </>
  );
  const renderSizeInput = (
    <>
      {(category === "clothing" || category === "hats") && (
        <>
          <h3>Size</h3>
          <ul className={styles.list}>
            {["X-Small", "Small", "Medium", "Large", "X-Large"].map(
              (input, i) => (
                <SidebarFilterInput
                  key={i}
                  inputType="checkbox"
                  value={input}
                />
              )
            )}
          </ul>
        </>
      )}
      {category === "shoes" && (
        <>
          <h3>Size</h3>
          <select className={styles.shoeSizes}>
            {[38, 39, 40, 41, 42].map((input, i) => (
              <SidebarFilterInput key={i} inputType="option" value={input} />
            ))}
          </select>
        </>
      )}
    </>
  );
  const renderColorInput = (
    <>
      <h3>Color</h3>
      <ul className={styles.list}>
        {["Green", "Red", "Blue", "White", "Black"].map((color, i) => (
          <SidebarFilterInput key={i} inputType="checkbox" value={color} />
        ))}
      </ul>
    </>
  );
  const renderPriceRangeInput = (
    <>
      <h3>Price Filter</h3>
      <SidebarFilterInput
        inputType="range"
        value={1}
        onChange={setInputValue}
      />
      <p>
        Range: $ {inputValue[0]} - $ {inputValue[1]}
      </p>
    </>
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterBox}>{renderCategoriesLinks}</div>
      {category !== "accessories" && (
        <div className={styles.filterBox}>{renderSizeInput}</div>
      )}
      <div className={styles.filterBox}>{renderColorInput}</div>
      <div className={styles.priceBox}>{renderPriceRangeInput}</div>
    </aside>
  );
};

export default SidebarFilter;
