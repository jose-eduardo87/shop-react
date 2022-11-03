import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarFilterInput } from "components/ui/index";

import styles from "./SidebarFilter.module.css";

const inputSize = {
  clothing: ["X-Small", "Small", "Medium", "Large", "X-Large"],
  shoes: [38, 39, 40, 41, 42],
};

const SidebarFilter: FC<{ category: string | undefined }> = ({ category }) => {
  const [inputValue, setInputValue] = useState([1, 15]);
  const renderCategoriesLinks = (
    <>
      <h3>Categories</h3>
      <ul className={styles.list}>
        <Link to="/categories/clothing">
          <li className={styles.link}>Clothing</li>
        </Link>
        <Link to="/categories/accessories">
          <li className={styles.link}>Accessories</li>
        </Link>
        <Link to="/categories/shoes">
          <li className={styles.link}>Shoes</li>
        </Link>
        <Link to="/categories/hats">
          <li className={styles.link}>Hats</li>
        </Link>
      </ul>
    </>
  );
  const renderSizeInput = (
    <>
      {(category === "clothing" || category === "hats") && (
        <>
          <h3>Size</h3>
          <ul className={styles.list}>
            {inputSize["clothing"].map((input, i) => (
              <SidebarFilterInput key={i} inputType="checkbox" value={input} />
            ))}
          </ul>
        </>
      )}
      {category === "shoes" && (
        <>
          <h3>Size</h3>
          <select className={styles.shoeSizes}>
            {inputSize["shoes"].map((input, i) => (
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
        onChangeRange={setInputValue}
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
