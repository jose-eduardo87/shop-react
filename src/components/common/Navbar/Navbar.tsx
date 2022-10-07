import { useState } from "react";
import { Cart, Favourite } from "components/icons/index";
import { CartModal } from "components/ui/index";
import { useCart } from "store";
import { iconStyles } from "helpers/constants";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isCartOpened, setIsCartOpened] = useState(false);
  const { cart, onIncrementItem, onAddItem, onDecrementItem, onRemoveItem } =
    useCart();
  const clickCartHandler = () => setIsCartOpened((prevState) => !prevState);

  return (
    <header className={styles.root}>
      <div className={styles.headerContainer}>
        <h1>React Shop!</h1>
        <ul className={styles.links}>
          <button
            onClick={() =>
              onAddItem({
                id: "p02",
                name: "Clock",
                price: 124,
                quantity: 1,
                additionalInfo: { size: ["S", "M"] },
              })
            }
          >
            Link 1
          </button>
          <button onClick={() => onIncrementItem("p02")}>Link 2</button>
          <button onClick={() => onDecrementItem("p02")}>Link 3</button>
          <button onClick={() => onRemoveItem("p02")}>Link 4</button>
        </ul>
        <div className={styles.iconsBox}>
          <Cart clickCartHandler={clickCartHandler} {...iconStyles} />
          {cart.totalItemsInCart > 0 && (
            <div className={styles.iconBadge}>
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
