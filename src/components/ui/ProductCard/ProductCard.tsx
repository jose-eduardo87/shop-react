import { FC } from "react";
import { ItemInterface } from "reducers";

import styles from "./ProductCard.module.css";

const ProductCard: FC<Pick<ItemInterface, "name" | "price" | "imageSrc">> = ({
  name,
  price,
  imageSrc,
}) => {
  return <div className={styles.card}>{`${name} `}</div>;
};

export default ProductCard;
