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

  const getUpdatedItem = (incrementor: number) =>
    state.map((item) => {
      if (item.id! === payload.id) {
        return { ...item, quantity: item.quantity! + incrementor };
      }

      return item;
    });

  switch (type) {
    case ActionKind.ADD:
      return [...state, payload.product!]; // returns original state including newly-added item in payload.
    case ActionKind.REMOVE:
      return [...state.filter((item) => item!.id !== payload.id)]; // filters item by id, excluding it from the returned values.
    case ActionKind.INCREMENT:
      return getUpdatedItem(1); // increments item quantity by one.
    case ActionKind.DECREMENT:
      return getUpdatedItem(-1); // decrements item quantity by one.
    default:
      return state;
  }
};

export default cartReducer;
