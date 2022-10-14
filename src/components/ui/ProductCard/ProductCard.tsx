import { FC } from "react";
import { AddToCart, AddToFavourites } from "components/icons/index";
import { ItemInterface } from "reducers/index";

import styles from "./ProductCard.module.css";

interface ProductCardInterface {
  item: ItemInterface;
  onAddItemToCart: (item: ItemInterface) => void;
  onAddItemToFavourite: (item: ItemInterface) => void;
}

const iconStyles = {
  width: 24,
  height: 24,
  fill: "#000",
};

const ProductCard: FC<ProductCardInterface> = ({
  item,
  onAddItemToCart,
  onAddItemToFavourite,
}) => {
  const { name, price } = item;

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
        <div className={styles.innerBox}>
          <AddToFavourites
            addToFavouritesHandler={() => onAddItemToFavourite(item)}
            {...iconStyles}
          />
          <p>Favourite</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
