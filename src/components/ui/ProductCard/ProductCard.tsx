import { FC } from "react";
import { Tooltip } from "components/ui/index";
import { AddToCart, AddToFavourites } from "components/icons/index";
import { ItemInterface } from "reducers/index";

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
    cursor: isFavouriteDisabled ? "not-allowed" : "pointer",
  };
  // let Tooltip = {};
  // if (!isFavouriteDisabled) {
  //   Tooltip = require("components/ui/Tooltip/Tooltip");
  // } else {
  //   Tooltip = import("components/icons/Truck");
  // }

  return (
    <div className={styles.card}>
      <div className={styles.productImage}></div>
      <div className={styles.productInfo}>
        <p className={styles.productPrice}>$ {price.toFixed(2)}</p>
        <p className={styles.productName}>{name}</p>
      </div>
      <div className={styles.interactiveBox}>
        <div className={styles.innerBox}>
          <AddToCart
            addToCartHandler={() => onAddItemToCart(item)}
            {...iconStyles}
          />
          <p>Cart</p>
        </div>
        <Tooltip message={"This item is in your cart!"}>
          <div className={styles.innerBox}>
            <AddToFavourites
              addToFavouritesHandler={() => onAddItemToFavourite(item)}
              {...iconStyles}
            />
            <p>Favourite</p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProductCard;
