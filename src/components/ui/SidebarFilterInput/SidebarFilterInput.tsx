import { FC, ChangeEvent, useEffect } from "react";
import { useCustomizeData } from "store";

import styles from "./SidebarFilterInput.module.css";

const SidebarFilterInput: FC<{
  inputType: string;
  filterType?: string;
  inputCheckbox?: { label: string; value: string };
  inputOption?: { option: string; value: string | number };
}> = ({ inputType, filterType, inputCheckbox, inputOption }) => {
  const { onClothingAndHatSizeChange, onColorChange, setPriceRange } =
    useCustomizeData();

  useEffect(() => {
    // in case component rendered is of inputType === 'range', this cleanup runs to reset price values to default.
    if (inputType === "range") {
      return setPriceRange([0, 999]);
    }
  }, [setPriceRange, inputType]);

  if (inputType === "checkbox") {
    const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
      filterType === "color"
        ? onColorChange(e.target.value, e.target.checked)
        : onClothingAndHatSizeChange(e.target.value, e.target.checked);

    return (
      <li className={styles.list}>
        <input
          type="checkbox"
          value={inputCheckbox!.value}
          onChange={(e) => onCheckboxChangeHandler(e)}
        />
        <label>{inputCheckbox!.label}</label>
      </li>
    );
  }
  if (inputType === "option") {
    return <option value={inputOption!.value}>{inputOption!.option}</option>;
  }

  const Slider = require("rc-slider").default;
  require("rc-slider/assets/index.css");

  return (
    <Slider
      range
      min={0}
      max={999}
      defaultValue={[0, 999]}
      onChange={(value: number[]) => setPriceRange(value)}
    />
  );
};

export default SidebarFilterInput;
