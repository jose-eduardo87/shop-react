import { FC, Dispatch, SetStateAction } from "react";

import styles from "./SidebarFilterInput.module.css";

const SidebarFilterInput: FC<{
  inputType: string;
  value: string | number;
  disabledItem?: string;
  onChange?: Dispatch<SetStateAction<number[]>>;
}> = ({ inputType, value, disabledItem, onChange }) => {
  const isInputDisabled = value === disabledItem;

  if (inputType === "checkbox") {
    return (
      <li className={styles.list}>
        <input type="checkbox" disabled={isInputDisabled} />
        <label>{value}</label>
      </li>
    );
  }
  if (inputType === "option") {
    return (
      <option disabled={isInputDisabled} selected={isInputDisabled}>
        {value}
      </option>
    );
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
