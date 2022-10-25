import { forwardRef } from "react";

// export const MenuItem = forwardRef<
//   HTMLButtonElement,
//   { label: string; disabled?: boolean }
// >(({ label, disabled, ...props }, ref) => {
//   return (
//     <button {...props} ref={ref} role="menuitem" disabled={disabled}>
//       {label}
//     </button>
//   );
// });

export const MenuItem = ({ name }: { name: string }) => {
  return <div>{name}</div>;
};
