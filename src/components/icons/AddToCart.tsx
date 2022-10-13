import { FC, SVGProps } from "react";

interface AddToCartInterface extends SVGProps<SVGSVGElement> {
  addToCartHandler: () => void;
}

const AddToCart: FC<AddToCartInterface> = ({
  addToCartHandler,
  ...properties
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    style={{ cursor: "pointer" }}
    xmlSpace="preserve"
    onClick={() => addToCartHandler()}
    {...properties}
  >
    <path d="M25.856 10.641C21.673 19.5 20.312 19.5 19.5 19.5h-8c-2.802 0-4.949-1.648-5.47-4.2-.016-.078-1.6-7.853-2.005-10.025C3.826 4.21 3.32 3.5 1.5 3.5a1.5 1.5 0 1 1 0-3C4.52.5 6.464 2 6.974 4.724c.401 2.149 1.98 9.898 1.996 9.977.319 1.566 1.722 1.8 2.53 1.8h7.605c.817-.878 2.679-4.261 4.038-7.141a1.502 1.502 0 0 1 1.997-.716c.75.353 1.07 1.247.716 1.997zM10.5 20.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm9 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-4.837-8.156c.1.081.223.12.346.12s.244-.039.346-.12c.1-.079 2.828-2.74 4.316-4.954a.556.556 0 0 0 .028-.574.555.555 0 0 0-.49-.295h-2.226s-.217-4.291-.359-4.49c-.206-.294-1.057-.494-1.616-.494-.561 0-1.427.2-1.634.494-.141.198-.328 4.49-.328 4.49h-2.255a.559.559 0 0 0-.464.869c1.489 2.215 4.237 4.875 4.336 4.954z" />
  </svg>
);

export default AddToCart;
