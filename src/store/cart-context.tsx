import { createContext, FC, ReactNode, useContext, useReducer } from "react";
import { cartReducer, ActionKind, CartInterface } from "reducers/index";

interface CartProviderInterface {
  cart: CartInterface[];
  totalItemsOnCart: number;
  totalValue: number;
  onIncrementItem: (id: string) => void;
  onDecrementItem: (id: string) => void;
  onAddItem: (product: CartInterface) => void;
  onRemoveItem: (id: string) => void;
}

const initialState = {
  cart: [],
  totalItemsOnCart: 0,
  totalValue: 0,
  onIncrementItem: (id: string) => {},
  onDecrementItem: (id: string) => {},
  onAddItem: (product: CartInterface) => {},
  onRemoveItem: (id: string) => {},
};

const CartContext = createContext<CartProviderInterface>(initialState);

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [
    {
      id: "p01",
      name: "Hat",
      price: 10,
      quantity: 1,
      additionalInfo: { colors: ["black", "white", "red"] },
    },
  ]);
  const totalItemsOnCart = cart.reduce(
    (prev, { quantity }) => prev + quantity,
    0
  );
  const totalValue = cart.reduce((prev, { price }) => prev + price, 0); // NOT WORKING
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
        totalItemsOnCart,
        totalValue,
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
