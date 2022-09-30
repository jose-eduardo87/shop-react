import { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalOverlay } from "components/ui/index";

import styles from "./CartModal.module.css";

const CartModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const backdropElement = document.getElementById(
    "backdrop-root"
  ) as HTMLElement;
  const modalElement = document.getElementById("overlay-root") as HTMLElement;
  const cartModalRender = (
    <ModalOverlay>
      <div className={styles.cartModal}>
        <div className={styles.itemsList}>
          <h1>Your items:</h1>
          <p>Empty cart.</p>
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
