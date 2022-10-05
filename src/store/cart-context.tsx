import { createContext, FC, ReactNode, useContext, useReducer } from "react";
import { cartReducer, ActionKind, CartInterface } from "reducers/index";

interface CartProviderInterface {
  cart: Partial<CartInterface>[];
  onIncrementItem: (id: string) => void;
  onDecrementItem: (id: string) => void;
  onAddItem: (product: CartInterface) => void;
  onRemoveItem: (id: string) => void;
}

const initialState = {
  cart: [],
  onIncrementItem: (id: string) => {},
  onDecrementItem: (id: string) => {},
  onAddItem: (product: CartInterface) => {},
  onRemoveItem: (id: string) => {},
};

const CartContext = createContext<CartProviderInterface>(initialState);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const incrementItemHandler = (id: string) =>
    dispatch({ type: ActionKind.INCREMENT, payload: { id } });
  const decrementItemHandler = (id: string) =>
    dispatch({ type: ActionKind.DECREMENT, payload: { id } });
  const addItemHandler = (product: CartInterface) =>
    dispatch({ type: ActionKind.ADD, payload: { product } });
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
