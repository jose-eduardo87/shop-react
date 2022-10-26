import { FC } from "react";
import { useCart, useFavourite } from "store/index";
import { ItemInterface } from "reducers/index";
import { Cart, Trash } from "components/icons/index";

import styles from "./FavouriteItem.module.css";

const iconStyles = {
  width: 16,
  fill: "#818181",
};

const FavouriteItem: FC<{ item: ItemInterface }> = ({ item }) => {
  const { id, name, price } = item;
  const { onAddItemToCart } = useCart();
  const { onRemoveItemFromFavourite } = useFavourite();
  const moveItemToCartHandler = (id: string, item: ItemInterface) => {
    onRemoveItemFromFavourite(id);
    onAddItemToCart(item);
  };

  return (
    <div className={styles.card}>
      <div className={styles.productImage}></div>
      <div className={styles.productInfo}>
        <h1>{name}</h1>
        <p>$ {price.toFixed(2)}</p>
      </div>
      <div className={styles.buttonsBox}>
        <button onClick={() => moveItemToCartHandler(id, item)}>
          <Cart {...iconStyles} />
        </button>
        <button onClick={() => onRemoveItemFromFavourite(id)}>
          <Trash {...iconStyles} />
        </button>
      </div>
    </div>
  );
};

export default FavouriteItem;
