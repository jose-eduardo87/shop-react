import { FC } from "react";
import { useCart, useFavourite } from "store/index";
import { Tooltip } from "components/ui/index";
import { ItemInterface } from "helpers/index";
import { Cart, Trash } from "components/icons/index";

import styles from "./FavouriteCard.module.css";

const iconStyles = {
  width: 16,
  fill: "#818181",
};

const FavouriteCard: FC<{ item: ItemInterface }> = ({ item }) => {
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
        <Tooltip message="Move item to cart.">
          <button onClick={() => moveItemToCartHandler(id, item)}>
            <Cart {...iconStyles} />
          </button>
        </Tooltip>
        <Tooltip message="Remove item.">
          <button onClick={() => onRemoveItemFromFavourite(id)}>
            <Trash {...iconStyles} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default FavouriteCard;
