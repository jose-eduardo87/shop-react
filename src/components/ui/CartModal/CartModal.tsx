import { FC } from "react";
import { createPortal } from "react-dom";
import { CartCard, Backdrop, ModalOverlay } from "components/ui/index";
import { useCart } from "store/index";

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
        <p>Your items:</p>
        <div className={styles.itemsList}>
          {cart.length ? (
            cart.map(({ id, ...rest }) => <CartCard key={id} {...rest} />)
          ) : (
            <p>No items added.</p>
          )}
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
