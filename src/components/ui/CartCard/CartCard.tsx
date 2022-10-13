import { FC, memo } from "react";
import { CloseButton } from "components/icons/index";
import { ItemInterface } from "reducers/index";
import { iconStyles } from "helpers/constants";

import styles from "./CartCard.module.css";

interface CartCardInterface {
  item: ItemInterface;
  onRemoveItem: (id: string) => void;
  onIncrementItem: (id: string) => void;
  onDecrementItem: (id: string) => void;
}

const CartCard: FC<CartCardInterface> = ({
  item,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
}) => {
  const { id, name, price, quantity, qtyAvailable } = item;
  console.log("Render.");

  return (
    <div className={styles.card}>
      <CloseButton
        removeItemFromCartHandler={() => onRemoveItem(id)}
        {...iconStyles}
      />
      <div className={styles.productImage}></div>
      <div className={styles.productInfo}>
        <p className={styles.productName}>{name}</p>
        <p className={styles.productPrice}>$ {(quantity * price).toFixed(2)}</p>
      </div>
      <div className={styles.productAmount}>
        <p className={styles.productAvailability}>
          {quantity} of {qtyAvailable} available.
        </p>
        <div className={styles.buttonsGroup}>
          <button
            disabled={!(quantity < qtyAvailable)}
            className={styles.button}
            onClick={() => onIncrementItem(id)}
          >
            +
          </button>
          <button
            disabled={quantity === 1}
            className={styles.button}
            onClick={() => onDecrementItem(id)}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CartCard);
