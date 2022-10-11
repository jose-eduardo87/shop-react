import { FC } from "react";
import { ItemInterface } from "reducers/index";

import styles from "./CartCard.module.css";

const CartCard: FC<Omit<ItemInterface, "id">> = ({
  name,
  price,
  quantity,
  additionalInfo,
}) => {
  return (
    <div className={styles.card}>
      <p>{name}</p>
      <p>{price}</p>
      <input type={"number"} min={1} max={quantity} />
    </div>
  );
};

export default CartCard;
