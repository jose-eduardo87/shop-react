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
  quantity: number;
  additionalInfo: {
    size?: string[];
    colors?: string[];
  };
}

export interface CartInterface {
  items: ItemInterface[];
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

const cartReducer = (
  state: CartInterface,
  action: CartAction
): CartInterface => {
  const { type, payload } = action;

  const filterRemovedItem = () => {
    state.items = state.items.filter((item) => item.id !== payload.id);

    return { items: state.items };
  };
  const getUpdatedItem = (incrementor: number) => {
    const selectedItem = state.items.find((item) => item.id === payload.id);

    if (incrementor === -1 && selectedItem!.quantity === 1) {
      return filterRemovedItem();
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

        return { ...state, ...getUpdatedValueAndQuantity() };
      }

      state.items = [...state.items, payload.item!];

      // returns original state including newly-added item in payload.
      return {
        ...state,
        ...getUpdatedValueAndQuantity(),
      };
    case ActionKind.REMOVE:
      return {
        ...filterRemovedItem(),
        ...getUpdatedValueAndQuantity(),
      };
    case ActionKind.INCREMENT:
      return { ...getUpdatedItem(1), ...getUpdatedValueAndQuantity() };
    case ActionKind.DECREMENT:
      return { ...getUpdatedItem(-1), ...getUpdatedValueAndQuantity() };
    default:
      return state;
  }
};

export default cartReducer;
