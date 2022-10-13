import { FC } from "react";
import { createPortal } from "react-dom";
import { CartCard, Backdrop, ModalOverlay } from "components/ui/index";
import { EmptyCart } from "components/icons/index";
import { useCart } from "store/index";
import { iconStyles } from "helpers/constants";

import styles from "./CartModal.module.css";

const CartModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart, onRemoveItem, onIncrementItem, onDecrementItem } = useCart();
  const backdropElement = document.getElementById(
    "backdrop-root"
  ) as HTMLElement;
  const modalElement = document.getElementById("overlay-root") as HTMLElement;
  const cartModalRender = (
    <ModalOverlay>
      <div className={styles.cartModal}>
        <h1>Your items:</h1>
        <div className={styles.itemsList}>
          {cart.items.length ? (
            cart.items.map((product) => (
              <CartCard
                key={product.id}
                onRemoveItem={onRemoveItem}
                onIncrementItem={onIncrementItem}
                onDecrementItem={onDecrementItem}
                item={{ ...product }}
              />
            ))
          ) : (
            <p className={styles.emptyCart}>
              <EmptyCart {...iconStyles} fill="#818181" /> No items added.
            </p>
          )}
        </div>
        <div className={styles.checkoutInfo}>
          <p>Total: $ {cart.totalValue.toFixed(2)}</p>
        </div>
      </div>
    </ModalOverlay>
  );

  return (
    <>
      {createPortal(<Backdrop onClose={onClose} />, backdropElement)}
      {createPortal(cartModalRender, modalElement)}
    </>
  );
};

export default CartModal;
