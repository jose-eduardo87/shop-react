import { FC } from "react";
import { AddToCart, AddToFavourites } from "components/icons/index";
import { ItemInterface } from "reducers/index";
import { TooltipInterface } from "../Tooltip/Tooltip";

import styles from "./ProductCard.module.css";

interface ProductCardInterface {
  item: ItemInterface;
  onAddItemToCart: (item: ItemInterface) => void;
  onAddItemToFavourite: (item: ItemInterface) => void;
  isFavouriteDisabled: boolean;
}

const ProductCard: FC<ProductCardInterface> = ({
  item,
  onAddItemToCart,
  onAddItemToFavourite,
  isFavouriteDisabled,
}) => {
  const { name, price } = item;
  const iconStyles = {
    width: 24,
    height: 24,
    fill: "#000",
  };
  const children = (
    <div className={styles.innerBox}>
      <button
        disabled={isFavouriteDisabled}
        onClick={() => onAddItemToFavourite(item)}
      >
        <AddToFavourites {...iconStyles} />
        <p>Favourite</p>
      </button>
    </div>
  );
  let Tooltip: FC<TooltipInterface>,
    renderFavouriteIcon: typeof Tooltip | JSX.Element;

  if (isFavouriteDisabled) {
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
        <p className={styles.productPrice}>$ {price.toFixed(2)}</p>
        <p className={styles.productName}>{name}</p>
      </div>
      <div className={styles.interactiveBox}>
        <div className={styles.innerBox}>
          <button onClick={() => onAddItemToCart(item)}>
            <AddToCart {...iconStyles} />
            <p>Cart</p>
          </button>
        </div>
        {renderFavouriteIcon}
      </div>
    </div>
  );
};

export default ProductCard;
