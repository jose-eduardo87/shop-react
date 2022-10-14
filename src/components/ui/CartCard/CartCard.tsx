import { FC, memo } from "react";
import { CloseButton } from "components/icons/index";
import { Minus, Plus } from "components/icons/index";
import { ItemInterface } from "reducers/index";
import { useCart } from "store/index";
import { iconStyles } from "helpers/constants";

import styles from "./CartCard.module.css";

interface CartCardInterface {
  item: ItemInterface;
}

const buttonIconStyles = {
  width: 12,
  fill: "#FFEF00",
};

const CartCard: FC<CartCardInterface> = ({ item }) => {
  const { id, name, price, quantity, qtyAvailable } = item;
  const { onRemoveItemFromCart, onIncrementItemInCart, onDecrementItemInCart } =
    useCart();
  const isPlusButtonDisabled = !(quantity < qtyAvailable);
  const isMinusButtonDisabled = quantity === 1;
  const disableButtonStyle = {
    cursor: "not-allowed",
    backgroundColor: "rgba(255,255,255,.3)",
  };
  console.log("Render.");

  return (
    <div className={styles.card}>
      <CloseButton
        removeItemFromCartHandler={() => onRemoveItemFromCart(id)}
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
            disabled={isPlusButtonDisabled}
            style={isPlusButtonDisabled ? disableButtonStyle : {}}
            className={styles.button}
            onClick={() => onIncrementItemInCart(id)}
          >
            <Plus {...buttonIconStyles} />
          </button>
          <button
            disabled={isMinusButtonDisabled}
            style={isMinusButtonDisabled ? disableButtonStyle : {}}
            className={styles.button}
            onClick={() => onDecrementItemInCart(id)}
          >
            <Minus {...buttonIconStyles} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CartCard);
