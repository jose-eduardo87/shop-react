import { FC } from "react";
import { Link } from "react-router-dom";
import { RightArrow } from "components/icons";

import styles from "./Breadcrumb.module.css";

interface BreadcrumbInterface {
  breadcrumb: { name: string; path: string }[];
}

const iconStyles = {
  width: 12,
  height: 12,
  fill: "#A1A1A1",
};

const Breadcrumb: FC<BreadcrumbInterface> = ({ breadcrumb }) => {
  return (
    <ul className={styles.breadcrumb}>
      <RightArrow {...iconStyles} />
      {breadcrumb.map(({ name, path }, i) => {
        if (path.length) {
          return (
            <span key={i}>
              <Link to={path}>
                <li className={`${styles.pathName} ${styles.activeLink}`}>
                  {name}
                </li>
              </Link>
              <span> | </span>
            </span>
          );
        }

        return (
          <li key={i} className={styles.pathName}>
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumb;
