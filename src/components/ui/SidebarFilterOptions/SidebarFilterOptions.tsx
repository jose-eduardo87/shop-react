import { FC, useState } from "react";
import { SidebarFilterInput } from "components/ui/index";

import styles from "./SidebarFilterOptions.module.css";

const SidebarFilterOptions: FC<{ category: string | undefined }> = ({
  category,
}) => {
  const [inputValue, setInputValue] = useState([160, 640]);
  const renderClothingSizeInput = (
    <ul className={styles.list}>
      {["X-Small", "Small", "Medium", "Large", "X-Large"].map((input, i) => (
        <SidebarFilterInput
          key={i}
          inputType="checkbox"
          inputCheckbox={input}
        />
      ))}
    </ul>
  );
  const renderShoeSizeInput = (
    <select defaultValue="Select a size" className={styles.shoeSizes}>
      <option disabled>Select a size</option>
      {[
        { option: "38", value: 38 },
        { option: "39", value: 39 },
        { option: "40", value: 40 },
        { option: "41", value: 41 },
        { option: "42", value: 42 },
      ].map((input, i) => (
        <SidebarFilterInput key={i} inputType="option" inputOption={input} />
      ))}
    </select>
  );
  const renderColorInput = (
    <>
      <ul className={styles.list}>
        {["Green", "Red", "Blue", "White", "Black"].map((input, i) => (
          <SidebarFilterInput
            key={i}
            inputType="checkbox"
            inputCheckbox={input}
          />
        ))}
      </ul>
    </>
  );
  const renderPriceRangeInput = (
    <>
      <SidebarFilterInput inputType="range" onChange={setInputValue} />
      <p>
        Range:{" "}
        <span className={styles.priceRange}>
          $ {inputValue[0]} - $ {inputValue[1]}
        </span>
      </p>
    </>
  );

  return (
    <div className={styles.filterOptions}>
      {category !== "accessories" && category !== "shoes" && (
        <div className={styles.filterBox}>
          <h3>Clothing & Hat Sizing</h3>
          {renderClothingSizeInput}
        </div>
      )}
      {(!category || category === "shoes") && (
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
    </div>
  );
};

export default SidebarFilterOptions;
