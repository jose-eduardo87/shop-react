import { useState } from "react";
import { Cart, Favourite } from "components/icons/index";
import { CartModal } from "components/ui/index";
import { useCart } from "store/index";
import { iconStyles } from "helpers/constants";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const { cart } = useCart();
  const clickCartHandler = () => setIsCartOpened((prevState) => !prevState);

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
          {cart.totalItemsInCart > 0 && (
            <div key={Math.random()} className={styles.iconBadge}>
              <span>{cart.totalItemsInCart}</span>
            </div>
          )}
          <Favourite {...iconStyles} />
        </div>
      </div>
      {isCartOpened && <CartModal onClose={clickCartHandler} />}
    </header>
  );
};

export default Navbar;
