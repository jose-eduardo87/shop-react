import { FC } from "react";
import { createPortal } from "react-dom";
import { CartCard, Backdrop, ModalOverlay } from "components/ui/index";
import { EmptyCart } from "components/icons/index";
import { useCart } from "store/index";
import { iconStyles } from "helpers/constants";

import styles from "./CartModal.module.css";

const CartModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart } = useCart();
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
            cart.items.map(({ id, ...rest }) => <CartCard key={id} {...rest} />)
          ) : (
            <p className={styles.emptyCart}>
              <EmptyCart {...iconStyles} fill="#818181" /> No items added.
            </p>
          )}
          {JSON.stringify(cart.totalValue)}
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
