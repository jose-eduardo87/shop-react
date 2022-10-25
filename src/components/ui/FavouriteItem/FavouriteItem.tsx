import { FC } from "react";
import { useCart, useFavourite } from "store/index";
import { ItemInterface } from "reducers/index";

import styles from "./FavouriteItem.module.css";

const FavouriteItem: FC<{ item: ItemInterface }> = ({ item }) => {
  const { id, name, imageSrc, price } = item;
  const { onAddItemToCart } = useCart();
  const { onRemoveItemFromFavourite } = useFavourite();
  const moveItemToCartHandler = (id: string, item: ItemInterface) => {
    onRemoveItemFromFavourite(id);

    onAddItemToCart(item);
  };

  return (
    <div className={styles.card}>
      <p>{name}</p>
      {/* <p>{imageSrc}</p> */}
      <p>$ {price.toFixed(2)}</p>
      <div className={styles.buttonsBox}>
        <button onClick={() => moveItemToCartHandler(id, item)}>MOVE</button>
        <button onClick={() => onRemoveItemFromFavourite(id)}>REMOVE</button>
      </div>
    </div>
  );
};

export default FavouriteItem;
