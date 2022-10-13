import { FC, SVGProps } from "react";

interface CartSVGInterface extends SVGProps<SVGSVGElement> {
  clickCartHandler: () => void;
}

const Cart: FC<CartSVGInterface> = ({ clickCartHandler, ...CSSProperties }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60.013 60.013"
      style={{ cursor: "pointer" }}
      xmlSpace="preserve"
      onClick={clickCartHandler}
      {...CSSProperties}
    >
      <path d="m11.68 13.006-.832-5h-2.99c-.447-1.72-1.999-3-3.858-3-2.206 0-4 1.794-4 4s1.794 4 4 4c1.859 0 3.411-1.28 3.858-3h1.294l.5 3h-.037l5.17 26.016c-2.465.188-4.518 2.086-4.76 4.474A5.01 5.01 0 0 0 15 49.006h2c0 3.309 2.691 6 6 6s6-2.691 6-6h11c0 3.309 2.691 6 6 6s6-2.691 6-6h4a1 1 0 1 0 0-2h-4.35c-.826-2.327-3.043-4-5.65-4s-4.824 1.673-5.65 4h-11.7c-.826-2.327-3.043-4-5.65-4s-4.824 1.673-5.65 4H15a3.01 3.01 0 0 1-2.224-.993 2.968 2.968 0 0 1-.761-2.316c.152-1.509 1.546-2.69 3.173-2.69h.841L38.328 41h.003l11.314-.004h.002l5.377-.002a4.993 4.993 0 0 0 4.988-4.987V12.994l-48.332.012zm-7.68-2c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm42 34c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm-23 0c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm35.013-14.79-8.78 8.779-8.487.003L58.013 21.73v8.486zm0-11.314L37.917 38.999l-8.49.003 24.008-24.007 4.578-.001v3.908zM18.111 39.005l24.007-24.007 8.488-.002-24.008 24.006-8.487.003zm-4.828-17.8 6.201-6.201 8.489-.002L14.69 28.284l-1.407-7.079zm3.372-6.2-3.841 3.841-.763-3.839 4.604-.002zm-1.497 15.639 15.643-15.643 8.488-.002-22.674 22.673c-.021.021-.028.048-.046.069l-1.411-7.097zm39.866 8.35-2.963.001 5.951-5.95v2.962a2.99 2.99 0 0 1-2.988 2.987z" />
    </svg>
  );
};

export default Cart;
