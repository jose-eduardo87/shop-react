import { FC } from "react";
import { ProductCard } from "components/ui/index";
import { useCart } from "store/index";
import { ItemInterface } from "reducers/index";

import styles from "./ProductsGrid.module.css";

const ProductsGrid: FC<{ products: ItemInterface[] }> = ({ products }) => {
  const { onAddItem } = useCart();
  const renderProducts = products.map((product) => (
    <ProductCard key={product.id} onAddItem={onAddItem} item={{ ...product }} />
  ));

  return <div className={styles.productsGrid}>{renderProducts}</div>;
};

export default ProductsGrid;
