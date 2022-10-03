import { createContext, FC, useContext, useReducer } from "react";

enum ActionKind {
  ADD = "ADD_ITEM",
  REMOVE = "REMOVE_ITEM",
  INCREMENT = "INCREMENT_ITEM",
  DECREMENT = "DECREMENT_ITEM",
}

export interface CartInterface {
  id: string;
  name: string;
  price: number;
  quantity: number;
  additionalInfo: {
    size?: string[];
    colors?: string[];
  };
}

interface CartAction {
  type: ActionKind;
  payload: {
    id?: string;
    product?: CartInterface;
  };
}

const cartReducer = (state: CartInterface[], action: CartAction) => {
  const { type, payload } = action;
  const updateItem = (incrementor: number) =>
    state.map((item) => {
      if (item.id === payload.id) {
        return { ...item, quantity: item.quantity + incrementor };
      }

      return item;
    });

  switch (type) {
    case ActionKind.ADD:
      return [...state, payload.product];
    case ActionKind.REMOVE:
      const filteredCart = state.filter((item) => item.id !== payload.id);

      return [...filteredCart];
    case ActionKind.INCREMENT:
      return { ...updateItem(1) };
    case ActionKind.DECREMENT:
      return { ...updateItem(-1) };
    default:
      return state;
  }
};

const CartContext = createContext<Partial<CartInterface[]>>([]);

const CartProvider: FC = () => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return <CartContext.Provider value={cart} />;
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
