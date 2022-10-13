import { FC, SVGProps } from "react";

interface CloseButtonInterface extends SVGProps<SVGSVGElement> {
  removeItemFromCartHandler: () => void;
}

const CloseButton: FC<CloseButtonInterface> = ({
  removeItemFromCartHandler,
  ...properties
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: "pointer" }}
    onClick={() => removeItemFromCartHandler()}
    {...properties}
  >
    <path
      fillRule="evenodd"
      d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.75.75 0 1 1 1.06 1.06L13.06 12l5.22 5.22a.75.75 0 1 1-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 0 1-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06z"
    />
  </svg>
);

export default CloseButton;
