import { useState } from "react";
import { Cart, Favourite } from "components/icons/index";
import { CartModal } from "components/ui/index";
import { CSSProperties } from "react";
import { useCart } from "store";

import styles from "./Navbar.module.css";

const iconStyles: CSSProperties = {
  width: 24,
  height: 24,
  fill: "#FEFEFE",
};

const Navbar = () => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const { totalItemsOnCart } = useCart();
  const clickCartHandler = () => setIsCartOpened((prevState) => !prevState);
  console.log(`Total Items on Cart: ${totalItemsOnCart}`);

  return (
    <header className={styles.root}>
      <div className={styles.headerContainer}>
        <h1>React Shop!</h1>
        <ul className={styles.links}>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
        <div className={styles.iconsBox}>
          <Cart clickCartHandler={clickCartHandler} {...iconStyles} />
          <Favourite {...iconStyles} />
        </div>
      </div>
      {isCartOpened && <CartModal onClose={clickCartHandler} />}
    </header>
  );
};

export default Navbar;
