import { createContext, FC, ReactNode, useContext, useReducer } from "react";
import {
  cartReducer,
  ActionKind,
  ItemInterface,
  CartInterface,
} from "reducers/index";

interface CartProviderInterface {
  cart: CartInterface;
  onIncrementItem: (id: string) => void;
  onDecrementItem: (id: string) => void;
  onAddItem: (item: ItemInterface) => void;
  onRemoveItem: (id: string) => void;
}

const initialState = {
  cart: {
    items: [],
    totalItemsInCart: 0,
    totalValue: 0,
  },
  onIncrementItem: (id: string) => {},
  onDecrementItem: (id: string) => {},
  onAddItem: (item: ItemInterface) => {},
  onRemoveItem: (id: string) => {},
};

const CartContext = createContext<CartProviderInterface>(initialState);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const state = {
    items: [],
    totalItemsInCart: 0,
    totalValue: 0,
  };
  const [cart, dispatch] = useReducer(cartReducer, state);
  const incrementItemHandler = (id: string) =>
    dispatch({ type: ActionKind.INCREMENT, payload: { id } });
  const decrementItemHandler = (id: string) =>
    dispatch({ type: ActionKind.DECREMENT, payload: { id } });
  const addItemHandler = (item: ItemInterface) =>
    dispatch({ type: ActionKind.ADD, payload: { item } });
  const removeItemHandler = (id: string) =>
    dispatch({ type: ActionKind.REMOVE, payload: { id } });

  return (
    <CartContext.Provider
      value={{
        cart,
        onIncrementItem: incrementItemHandler,
        onDecrementItem: decrementItemHandler,
        onAddItem: addItemHandler,
        onRemoveItem: removeItemHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
