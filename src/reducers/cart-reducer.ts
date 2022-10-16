import { FavouriteInterface } from "./index";

export enum ActionKind {
  ADD = "ADD_ITEM",
  REMOVE = "REMOVE_ITEM",
  INCREMENT = "INCREMENT_ITEM",
  DECREMENT = "DECREMENT_ITEM",
}

export interface ItemInterface {
  id: string;
  name: string;
  price: number;
  qtyAvailable: number;
  quantity: number;
  imageSrc: string;
  additionalInfo: {
    size?: string[];
    colors?: string[];
  };
}

export interface CartInterface {
  items: ItemInterface[];
  hash: { [key: string]: boolean };
  totalItemsInCart: number;
  totalValue: number;
}

interface CartAction {
  type: ActionKind;
  payload: {
    id?: string;
    item?: ItemInterface;
  };
}

// utility function used in favourite-reducer.ts.
export const filterRemovedItem = (
  state: CartInterface | FavouriteInterface,
  id: string
) => {
  state.items = state.items.filter((item) => item.id !== id);

  return { items: state.items };
};
// utility function also used in favourite-context.ts to hash creation.
export const getHash = (state: CartInterface | FavouriteInterface) => {
  // generates hash table with product's IDs as properties.
  const hash: { [key: string]: boolean } = {};
  state.items.forEach(({ id }) => (hash[id] = true));

  return { hash };
};

const cartReducer = (state: CartInterface, action: CartAction) => {
  const { type, payload } = action;

  const getUpdatedItem = (incrementor: number) => {
    const selectedItem = state.items.find((item) => item.id === payload.id);

    if (incrementor === -1 && selectedItem!.quantity === 1) {
      return filterRemovedItem(state, payload.id!);
    }

    selectedItem!.quantity += incrementor;

    return { items: state.items };
  };
  const getUpdatedValueAndQuantity = () => {
    const totalItemsInCart = state.items.reduce(
      (prev, { quantity }) => prev + quantity,
      0
    );
    const totalValue = state.items.reduce(
      (prev, { price, quantity }) => prev + price * quantity,
      0
    );

    return { totalItemsInCart, totalValue };
  };

  switch (type) {
    case ActionKind.ADD:
      const itemIndex = state.items.findIndex(
        (item) => item.id === payload.item!.id
      );

      // in case item added is already in cart, quantity will be added by 1.
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity++;

        return { ...state, ...getUpdatedValueAndQuantity(), ...getHash(state) };
      }

      state.items = [...state.items, payload.item!];

      // returns original state including newly-added item in payload.
      return {
        ...state,
        ...getUpdatedValueAndQuantity(),
        ...getHash(state),
      };
    case ActionKind.REMOVE:
      return {
        ...filterRemovedItem(state, payload.id!),
        ...getUpdatedValueAndQuantity(),
        ...getHash(state),
      };
    case ActionKind.INCREMENT:
      return {
        ...getUpdatedItem(1),
        ...getUpdatedValueAndQuantity(),
        ...getHash(state),
      };
    case ActionKind.DECREMENT:
      return {
        ...getUpdatedItem(-1),
        ...getUpdatedValueAndQuantity(),
        ...getHash(state),
      };
    default:
      return state;
  }
};

export default cartReducer;
