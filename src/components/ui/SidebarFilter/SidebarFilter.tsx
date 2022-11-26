import { FC, useEffect, useState } from "react";
import {
  SidebarSortCategories,
  SidebarFilterOptions,
} from "components/ui/index";

import styles from "./SidebarFilter.module.css";

interface SidebarFilterInterface {
  category: string | undefined;
  hasChangedCategory: boolean;
}

const SidebarFilter: FC<SidebarFilterInterface> = ({
  category,
  hasChangedCategory,
}) => {
  const [areFilterOptionsShown, setAreFilterOptionsShown] = useState(false);
  const toggleShowFilterOptions = () =>
    setAreFilterOptionsShown((prevState) => !prevState);

  // useEffect responsible for closing filter options (and thus reseting all previous marked filter items)
  // whenever there is a change in category
  useEffect(() => {
    if (hasChangedCategory) {
      setAreFilterOptionsShown(false);
    }
  }, [hasChangedCategory]);

  return (
    <aside className={styles.sidebar}>
      <SidebarSortCategories category={category} />
      <div className={styles.buttonBox}>
        <h3>Filter options</h3>
        {areFilterOptionsShown ? (
          <button onClick={toggleShowFilterOptions}>&#9650;</button>
        ) : (
          <button onClick={toggleShowFilterOptions}>&#9660;</button>
        )}
      </div>
      {areFilterOptionsShown && <SidebarFilterOptions category={category} />}
    </aside>
  );
};

export default SidebarFilter;
