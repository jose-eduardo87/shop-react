import { FC, ReactNode } from "react";

import styles from "./Modal.module.css";

export const Backdrop: FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

export const ModalOverlay: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};
