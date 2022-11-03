import { FC, ReactNode } from "react";

import styles from "./PageLayout.module.css";

const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default PageLayout;
