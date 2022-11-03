import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./Breadcrumb.module.css";

interface BreadcrumbInterface {
  breadcrumb: { name: string; path: string }[];
}

const Breadcrumb: FC<BreadcrumbInterface> = ({ breadcrumb }) => {
  return (
    <ul className={styles.breadcrumb}>
      {breadcrumb.map(({ name, path }) => {
        if (path.length) {
          return (
            <>
              <Link to={path}>
                <li className={`${styles.pathName} ${styles.activeLink}`}>
                  {name}
                </li>
              </Link>
              <span> / </span>
            </>
          );
        }

        return <li className={styles.pathName}>{name}</li>;
      })}
    </ul>
  );
};

export default Breadcrumb;
