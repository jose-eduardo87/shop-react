import { ChangeEvent, FC } from "react";
import { SidebarFilterInput } from "components/ui/index";
import { useCustomizeData, usePagination } from "store";

import styles from "./SidebarFilterOptions.module.css";

const SidebarFilterOptions: FC<{ category: string | undefined }> = ({
  category,
}) => {
  const { priceRange, onShoeSizeChange, onFilterItems } = useCustomizeData();
  const { setResetCurrentPage } = usePagination();
  const onFilterItemsHandler = () => {
    setResetCurrentPage((prevState) => !prevState);
    onFilterItems();
  };
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
          { label: "White", value: "white" },
          { label: "Black", value: "black" },
          { label: "Green", value: "green" },
          { label: "Red", value: "red" },
          { label: "Blue", value: "blue" },
          { label: "Yellow", value: "yellow" },
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
      <SidebarFilterInput inputType="range" />
      <p>
        Range:{" "}
        <span className={styles.priceRange}>
          $ {priceRange[0]} - $ {priceRange[1]}
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
      <button className={styles.button} onClick={onFilterItemsHandler}>
        Filter
      </button>
    </div>
  );
};

export default SidebarFilterOptions;
