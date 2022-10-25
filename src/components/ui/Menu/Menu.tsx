import { FC, forwardRef } from "react";
import {
  useFloatingParentNodeId,
  FloatingTree,
} from "@floating-ui/react-dom-interactions";
import { MenuComponent, MenuInterface } from "./MenuComponent";

const Menu: FC<MenuInterface> = forwardRef((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <MenuComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <MenuComponent {...props} ref={ref} />;
});

export default Menu;
