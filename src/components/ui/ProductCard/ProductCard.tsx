import { FC } from "react";
import { AddToCart, AddToFavourites } from "components/icons/index";
import { ItemInterface } from "reducers/index";

import styles from "./ProductCard.module.css";

interface ProductCardInterface {
  item: ItemInterface;
  onAddItem: (item: ItemInterface) => void;
}

const iconStyles = {
  width: 24,
  height: 24,
  fill: "#000",
};

const ProductCard: FC<ProductCardInterface> = ({ item, onAddItem }) => {
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
          <AddToCart addToCartHandler={() => onAddItem(item)} {...iconStyles} />
          <p>Cart</p>
        </div>
        <div className={styles.innerBox}>
          {/* <AddToFavourites {...iconStyles} /> */}
          <p>Favourite</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
