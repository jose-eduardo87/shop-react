import { useState } from "react";
import { Cart, Favourite } from "components/icons/index";
import { CartModal } from "components/ui/index";
import { useCart, useFavourite } from "store/index";
import { iconStyles } from "helpers/constants";
import logo from "./logo.png";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const { cart } = useCart();
  const { favourites } = useFavourite();
  const clickCartHandler = () => setIsCartOpened((prevState) => !prevState);
  console.log("favourites: ", favourites);

  return (
    <header className={styles.root}>
      <div className={styles.headerContainer}>
        <img src={logo} alt="Company logo" height={"80%"} />
        <ul className={styles.links}>
          <li>
            <a href="/#categories">Categories</a>
          </li>
          <li>
            <a href="/#products">Products</a>
          </li>
          <li>
            <a href="/#contact">Contact</a>
          </li>
          {/* <li><a href="/"></a></li> */}
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
