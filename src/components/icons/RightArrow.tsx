import { SVGProps } from "react";

const RightArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 59.414 59.414"
    xmlSpace="preserve"
    style={{ marginRight: ".5rem" }}
    {...props}
  >
    <path d="m15.561 0-1.415 1.414 28.293 28.293L14.146 58l1.415 1.414 29.707-29.707z" />
  </svg>
);

export default RightArrow;
