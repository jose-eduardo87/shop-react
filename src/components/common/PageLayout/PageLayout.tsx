import { FC, ReactNode, CSSProperties } from "react";

import styles from "./PageLayout.module.css";

interface CSSPropsInterface {
  root?: CSSProperties;
  container?: CSSProperties;
}

const PageLayout: FC<{
  children: ReactNode;
  CSSProps?: CSSPropsInterface;
}> = ({ children, CSSProps }) => {
  return (
    <section className={styles.root} style={CSSProps?.root}>
      <div style={CSSProps?.container}>{children}</div>
    </section>
  );
};

export default PageLayout;
