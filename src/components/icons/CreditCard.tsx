import { SVGProps } from "react";

const CreditCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 69.571 69.571"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M60.571 10.786H9c-4.962 0-9 4.038-9 9v30c0 4.963 4.038 9 9 9h51.571c4.963 0 9-4.037 9-9v-30c0-4.963-4.037-9-9-9zM9 16.786h51.571c1.654 0 3 1.346 3 3v3.852H6v-3.852c0-1.654 1.346-3 3-3zm51.571 35.999H9c-1.654 0-3-1.346-3-3V31.637h57.571v18.148c0 1.654-1.346 3-3 3z" />
  </svg>
);

export default CreditCard;
