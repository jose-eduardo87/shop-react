import { FC, CSSProperties, ReactNode } from "react";

import styles from "./Card.module.css";

const Card: FC<{ children: ReactNode; CSSStyles: CSSProperties }> = ({
  children,
  CSSStyles,
}) => {
  return (
    <div style={CSSStyles} className={styles.card}>
      {children}
    </div>
  );
};

export default Card;
