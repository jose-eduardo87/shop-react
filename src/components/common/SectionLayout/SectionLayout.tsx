import { FC, ReactNode, CSSProperties } from "react";

import styles from "./SectionLayout.module.css";

interface CSSPropsInterface {
  root?: CSSProperties;
  container?: CSSProperties;
}

const SectionLayout: FC<{
  id?: string;
  children: ReactNode;
  CSSProps?: CSSPropsInterface;
}> = ({ id, children, CSSProps }) => {
  return (
    <section id={id ? id : ""} className={styles.root} style={CSSProps?.root}>
      <div style={CSSProps?.container}>{children}</div>
    </section>
  );
};

export default SectionLayout;
