import { FC, memo } from "react";
import { AddToCart, AddToFavourites } from "components/icons/index";
import { ItemInterface } from "reducers/index";
import { TooltipInterface } from "components/ui/index";

import styles from "./ProductCard.module.css";

interface ProductCardInterface {
  item: ItemInterface;
  addItemToCartHandler: (item: ItemInterface) => void;
  addItemToFavouritesHandler: (item: ItemInterface) => void;
  favouriteIsDisabled: boolean;
}

const ProductCard: FC<ProductCardInterface> = ({
  item,
  addItemToCartHandler,
  addItemToFavouritesHandler,
  favouriteIsDisabled,
}) => {
  const iconStyles = {
    width: 24,
    height: 24,
    fill: "#000",
  };
  const children = (
    <div className={styles.innerBox}>
      <button
        disabled={favouriteIsDisabled}
        onClick={() => addItemToFavouritesHandler(item)}
      >
        <AddToFavourites {...iconStyles} />
        <p>Favourite</p>
      </button>
    </div>
  );
  let Tooltip: FC<TooltipInterface>,
    renderFavouriteIcon: typeof Tooltip | JSX.Element;

  if (favouriteIsDisabled) {
    Tooltip = require("components/ui/Tooltip/Tooltip").default;

    renderFavouriteIcon = (
      <Tooltip message="This item is already in your cart!">{children}</Tooltip>
    );
  } else {
    renderFavouriteIcon = children;
  }

  return (
    <div className={styles.card}>
      <div className={styles.productImage}></div>
      <div className={styles.productInfo}>
        <p className={styles.productPrice}>$ {item.price.toFixed(2)}</p>
        <p className={styles.productName}>{item.name}</p>
      </div>
      <div className={styles.interactiveBox}>
        <div className={styles.innerBox}>
          <button onClick={() => addItemToCartHandler(item)}>
            <AddToCart {...iconStyles} />
            <p>Cart</p>
          </button>
        </div>
        {renderFavouriteIcon}
      </div>
    </div>
  );
};

export default memo(ProductCard);
