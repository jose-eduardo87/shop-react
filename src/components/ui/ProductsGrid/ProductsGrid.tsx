import { FC } from "react";
import { ProductCard } from "components/ui/index";
import { useCart, useFavourite } from "store/index";
import { ItemInterface } from "reducers/index";

import styles from "./ProductsGrid.module.css";

const ProductsGrid: FC<{ products: ItemInterface[] }> = ({ products }) => {
  const { onAddItemToCart, cart } = useCart();
  const { onAddItemToFavourite, onRemoveItemFromFavourite, favourites } =
    useFavourite();
  const renderProducts = products.map((product) => {
    const itemIsInFavourites = favourites.hash[product.id];
    let addItemToCartHandler: () => void;

    if (itemIsInFavourites) {
      addItemToCartHandler = () => {
        onRemoveItemFromFavourite(product.id);

        onAddItemToCart(product);
      };
    } else {
      addItemToCartHandler = () => onAddItemToCart(product);
    }

    return (
      <ProductCard
        key={product.id}
        addItemToCartHandler={addItemToCartHandler}
        addItemToFavouritesHandler={onAddItemToFavourite}
        favouriteIsDisabled={cart.hash[product.id]}
        item={{ ...product }}
      />
    );
  });

  return <div className={styles.productsGrid}>{renderProducts}</div>;
};

export default ProductsGrid;
