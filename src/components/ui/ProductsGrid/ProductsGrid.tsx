import { FC } from "react";
import { ProductCard } from "components/ui/index";
import { useCart, useFavourite } from "store/index";
import { ItemInterface } from "reducers/index";

import styles from "./ProductsGrid.module.css";

const ProductsGrid: FC<{ products: ItemInterface[] }> = ({ products }) => {
  const { onAddItemToCart, cart } = useCart();
  const { onAddItemToFavourite, favourites } = useFavourite();
  console.log("hash fav.: ", favourites.hash);

  const renderProducts = products.map((product) => (
    <ProductCard
      key={product.id}
      onAddItemToCart={onAddItemToCart}
      onAddItemToFavourite={onAddItemToFavourite}
      isFavouriteDisabled={cart.hash[product.id] ? true : false}
      item={{ ...product }}
    />
  ));

  return <div className={styles.productsGrid}>{renderProducts}</div>;
};

export default ProductsGrid;
