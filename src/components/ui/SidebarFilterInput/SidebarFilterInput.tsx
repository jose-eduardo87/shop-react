import { FC, Dispatch, SetStateAction } from "react";

import styles from "./SidebarFilterInput.module.css";

const SidebarFilterInput: FC<{
  inputType: string;
  // value: string | number;
  inputCheckbox?: string | number;
  inputOption?: { option: string; value: string | number };
  onChange?: Dispatch<SetStateAction<number[]>>;
}> = ({ inputType, inputCheckbox, inputOption, onChange }) => {
  if (inputType === "checkbox") {
    return (
      <li className={styles.list}>
        <input type="checkbox" />
        <label>{inputCheckbox}</label>
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
      onChange={(value: number[]) => onChange!(value)}
    />
  );
};

export default SidebarFilterInput;
