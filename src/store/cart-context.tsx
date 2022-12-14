import { createContext, FC, ReactNode, useContext, useReducer } from "react";
import { cartReducer, ActionKind, CartInterface } from "reducers/index";
import { ItemInterface } from "helpers/index";

interface CartProviderInterface {
  cart: CartInterface;
  onIncrementItemInCart: (id: string) => void;
  onDecrementItemInCart: (id: string) => void;
  onAddItemToCart: (item: ItemInterface) => void;
  onRemoveItemFromCart: (id: string) => void;
}

const initialState = {
  cart: {
    items: [],
    hash: {},
    totalItemsInCart: 0,
    totalValue: 0,
  },
  onIncrementItemInCart: (id: string) => {},
  onDecrementItemInCart: (id: string) => {},
  onAddItemToCart: (item: ItemInterface) => {},
  onRemoveItemFromCart: (id: string) => {},
};
const CartContext = createContext<CartProviderInterface>(initialState);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const state = {
    items: [],
    hash: {},
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
        onIncrementItemInCart: (id) => incrementItemHandler(id),
        onDecrementItemInCart: (id) => decrementItemHandler(id),
        onAddItemToCart: (item) => addItemHandler(item),
        onRemoveItemFromCart: (id) => removeItemHandler(id),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
