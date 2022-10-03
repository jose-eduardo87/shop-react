import { FC } from "react";
import { CartInterface } from "store/cart-context";

import styles from "./CartCard.module.css";

const CartCard: FC<Omit<CartInterface, "id">> = ({
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
