export enum ActionKind {
  ADD = "ADD_ITEM",
  REMOVE = "REMOVE_ITEM",
  INCREMENT = "INCREMENT_ITEM",
  DECREMENT = "DECREMENT_ITEM",
}

interface CartAction {
  type: ActionKind;
  payload: {
    id?: string;
    product?: CartInterface;
  };
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

const cartReducer = (
  state: CartInterface[],
  action: CartAction
): CartInterface[] => {
  const { type, payload } = action;

  const filterRemovedItem = () =>
    state.filter((item) => item.id !== payload.id);
  const getUpdatedItem = (incrementor: number) => {
    const selectedItem = state.find((item) => item.id === payload.id);

    if (incrementor === -1 && selectedItem!.quantity === 1) {
      return filterRemovedItem();
    }

    selectedItem!.quantity += incrementor;

    return state;
  };

  switch (type) {
    case ActionKind.ADD:
      const itemIndex = state.findIndex(
        (item) => item.id === payload.product!.id
      );

      // in case item added is already in cart, quantity will be added by 1.
      if (itemIndex !== -1) {
        state[itemIndex].quantity++;

        return state;
      }

      return [...state, payload.product!]; // returns original state including newly-added item in payload.
    case ActionKind.REMOVE:
      return filterRemovedItem(); // filters item by id, excluding it from the returned values.
    case ActionKind.INCREMENT:
      return getUpdatedItem(1); // increments item quantity by one.
    case ActionKind.DECREMENT:
      return getUpdatedItem(-1); // decrements item quantity by one.
    default:
      return state;
  }
};

export default cartReducer;
