import { FC } from "react";
import { ProductCard } from "components/ui/index";
import { useCart, useFavourite } from "store/index";
import { ItemInterface } from "reducers/index";

import styles from "./ProductsGrid.module.css";

const ProductsGrid: FC<{ products: ItemInterface[] }> = ({ products }) => {
  const { onAddItemToCart } = useCart();
  const { onAddItemToFavourite } = useFavourite();
  const renderProducts = products.map((product) => (
    <ProductCard
      key={product.id}
      onAddItemToCart={onAddItemToCart}
      onAddItemToFavourite={onAddItemToFavourite}
      item={{ ...product }}
    />
  ));

  return <div className={styles.productsGrid}>{renderProducts}</div>;
};

export default ProductsGrid;
