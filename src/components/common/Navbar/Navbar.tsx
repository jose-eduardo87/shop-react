import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CartModal, FavouriteMenu } from "components/ui/index";
import { Cart } from "components/icons/index";
import { useCart, useFavourite } from "store/index";
import { iconStyles } from "helpers/constants";
import logo from "./logo.png";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const { cart } = useCart();
  const { favourites } = useFavourite();
  const clickCartHandler = () => setIsCartOpened((prevState) => !prevState);

  return (
    <header className={styles.root}>
      <div className={styles.headerContainer}>
        <NavLink to="/home">
          <img src={logo} alt="Company logo" />
        </NavLink>
        <ul className={styles.links}>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="#products">Products</NavLink>
          </li>
          <li>
            <NavLink to="#contact">Contact</NavLink>
          </li>
        </ul>
        <div className={styles.iconsBox}>
          <button onClick={clickCartHandler}>
            <Cart {...iconStyles} />
            {cart.totalItemsInCart > 0 && (
              <div
                key={Math.random()}
                className={`${styles.iconBadge} ${styles.badgeCart}`}
              >
                <span>
                  {cart.totalItemsInCart > 99 ? "+99" : cart.totalItemsInCart}
                </span>
              </div>
            )}
          </button>
          <FavouriteMenu />
          {favourites.totalItemsInFavourites > 0 && (
            <div className={`${styles.iconBadge} ${styles.badgeFavourite}`}>
              <span>
                {favourites.totalItemsInFavourites > 99
                  ? "+99"
                  : favourites.totalItemsInFavourites}
              </span>
            </div>
          )}
        </div>
      </div>
      {isCartOpened && <CartModal onClose={clickCartHandler} />}
    </header>
  );
};

export default Navbar;
