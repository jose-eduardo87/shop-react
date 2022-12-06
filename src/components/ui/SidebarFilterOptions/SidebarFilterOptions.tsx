import { ChangeEvent, FC, useState } from "react";
import { SidebarFilterInput } from "components/ui/index";
import { useCustomizeData } from "store";

import styles from "./SidebarFilterOptions.module.css";

const SidebarFilterOptions: FC<{ category: string | undefined }> = ({
  category,
}) => {
  const { onShoeSizeChange, onFilterItems } = useCustomizeData();
  const [inputValue, setInputValue] = useState([160, 640]);
  const onSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    onShoeSizeChange(+e.target.value);

  const renderClothingSizeInput = (
    <ul className={styles.list}>
      {[
        { label: "X-Small", value: "XS" },
        { label: "Small", value: "S" },
        { label: "Medium", value: "M" },
        { label: "Large", value: "L" },
        { label: "X-Large", value: "XL" },
      ].map((input, i) => (
        <SidebarFilterInput
          key={i}
          inputType="checkbox"
          inputCheckbox={input}
        />
      ))}
    </ul>
  );
  const renderShoeSizeInput = (
    <select
      defaultValue="Select a size"
      onChange={(e) => onSelectChangeHandler(e)}
      className={styles.shoeSizes}
    >
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
        {[
          { label: "Green", value: "green" },
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "White", value: "white" },
          { label: "Black", value: "black" },
        ].map((input, i) => (
          <SidebarFilterInput
            key={i}
            inputType="checkbox"
            filterType="color"
            inputCheckbox={input}
          />
        ))}
      </ul>
    </>
  );
  const renderPriceRangeInput = (
    <>
      <SidebarFilterInput inputType="range" onChangeRange={setInputValue} />
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
          <h4>Clothing & Hat Sizing</h4>
          {renderClothingSizeInput}
        </div>
      )}
      {(!category || category === "shoes") && (
        <div className={styles.filterBox}>
          <h4>Shoe Size</h4>
          {renderShoeSizeInput}
        </div>
      )}
      <div className={styles.filterBox}>
        <h4>Color</h4>
        {renderColorInput}
      </div>
      <div className={styles.priceBox}>
        <h4>Price Filter</h4>
        {renderPriceRangeInput}
      </div>
      <button onClick={onFilterItems}>Filter</button>
    </div>
  );
};

export default SidebarFilterOptions;
