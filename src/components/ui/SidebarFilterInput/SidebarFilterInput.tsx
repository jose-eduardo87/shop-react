import { FC, Dispatch, SetStateAction } from "react";

import styles from "./SidebarFilterInput.module.css";

const SidebarFilterInput: FC<{
  inputType: string;
  value: string | number;
  onChangeRange?: Dispatch<SetStateAction<number[]>>;
}> = ({ inputType, value, onChangeRange }) => {
  if (inputType === "checkbox") {
    return (
      <li className={styles.list}>
        <input type="checkbox" />
        <label>{value}</label>
      </li>
    );
  }
  if (inputType === "option") {
    return <option>{value}</option>;
  }
  const Slider = require("rc-slider").default;
  require("rc-slider/assets/index.css");

  return (
    <Slider
      range
      min={0}
      max={999}
      defaultValue={[1, 99]}
      // step={1}
      onChange={(value: number[]) => onChangeRange!(value)}
    />
  );
};

export default SidebarFilterInput;
