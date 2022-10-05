import { FC, useState, useEffect } from "react";
import { CartCard } from "components/ui/index";
import { createPortal } from "react-dom";
import { Backdrop, ModalOverlay } from "components/ui/index";
import { useCart } from "store/index";
import { CART } from "helpers/constants";

import styles from "./CartModal.module.css";

const CartModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { cart, onIncrementItem, onDecrementItem, onAddItem, onRemoveItem } =
    useCart();
  console.log(cart);
  const backdropElement = document.getElementById(
    "backdrop-root"
  ) as HTMLElement;
  const modalElement = document.getElementById("overlay-root") as HTMLElement;
  const cartModalRender = (
    <ModalOverlay>
      <div className={styles.cartModal}>
        <p>Your items:</p>
        <div className={styles.itemsList}>
          {CART.map(({ id, ...rest }) => (
            <CartCard key={id} {...rest} />
          ))}
        </div>
      </div>
    </ModalOverlay>
  );

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return isMounted ? (
    <>
      {createPortal(<Backdrop onClose={onClose} />, backdropElement)}
      {createPortal(cartModalRender, modalElement)}
    </>
  ) : null;
};

export default CartModal;
