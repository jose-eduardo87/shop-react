import { FC } from "react";
import { ProductCard } from "components/ui/index";
import { useCart, useFavourite } from "store/index";
import { ItemInterface } from "helpers/index";

import styles from "./ProductsGrid.module.css";

interface ProductsGridInterface {
  products: ItemInterface[] | [];
  setFixedHeight?: boolean;
}

const ProductsGrid: FC<ProductsGridInterface> = ({
  products,
  setFixedHeight,
}) => {
  const { onAddItemToCart, cart } = useCart();
  const { onAddItemToFavourite, onRemoveItemFromFavourite, favourites } =
    useFavourite();
  const renderProducts = products.map((product) => {
    const itemInFavourites = favourites.hash[product.id];
    let addItemToCartHandler: () => void;

    if (itemInFavourites) {
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

  return (
    <div
      className={styles.productsGrid}
      style={setFixedHeight ? { minHeight: "1060px" } : { minHeight: "" }}
    >
      {renderProducts}
    </div>
  );
};

export default ProductsGrid;
