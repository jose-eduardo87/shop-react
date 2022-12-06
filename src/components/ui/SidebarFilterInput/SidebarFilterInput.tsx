import { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useCustomizeData } from "store";

import styles from "./SidebarFilterInput.module.css";

const SidebarFilterInput: FC<{
  inputType: string;
  filterType?: string;
  inputCheckbox?: { label: string; value: string };
  inputOption?: { option: string; value: string | number };
  onChangeRange?: Dispatch<SetStateAction<number[]>>;
}> = ({ inputType, filterType, inputCheckbox, inputOption, onChangeRange }) => {
  const { onClothingAndHatSizeChange, onColorChange } = useCustomizeData();

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
      defaultValue={[160, 640]}
      onChange={(value: number[]) => onChangeRange!(value)}
    />
  );
};

export default SidebarFilterInput;
