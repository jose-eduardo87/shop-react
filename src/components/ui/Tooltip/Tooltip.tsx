import { cloneElement, FC, useMemo, useState } from "react";
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from "@floating-ui/react-dom-interactions";
import { mergeRefs } from "react-merge-refs";

export interface TooltipInterface {
  message: string;
  children: JSX.Element;
  placement?: Placement;
}

const Tooltip: FC<TooltipInterface> = ({
  message,
  children,
  placement = "top",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context),
  ]);
  const ref = useMemo(
    () => mergeRefs([reference, (children as any).ref]),
    [reference, children]
  );
  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {isOpen && (
        <div
          ref={floating}
          className="Tooltip"
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Tooltip;
