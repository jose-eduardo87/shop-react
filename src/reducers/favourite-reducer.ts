import { ItemInterface, ActionKind, filterRemovedItem } from "./index";

export interface FavouriteInterface {
  items: ItemInterface[];
  totalItemsInFavourites: number;
}

export interface FavouriteAction {
  type: Omit<ActionKind, ActionKind.INCREMENT | ActionKind.DECREMENT>;
  payload: {
    id?: string;
    item?: ItemInterface;
  };
}

const favouriteReducer = (
  state: FavouriteInterface,
  action: FavouriteAction
) => {
  const { type, payload } = action;

  const getTotalItemsInFavourites = () => {
    const totalItemsInFavourites = state.items.reduce(
      (prev, { quantity }) => prev + quantity,
      0
    );

    return { totalItemsInFavourites };
  };

  switch (type) {
    case ActionKind.ADD:
      const itemIndex = state.items.findIndex(
        (item) => item.id === payload.item!.id
      );

      // in case item is already added to the favourites, return unchanged state.
      if (itemIndex !== -1) {
        return state;
      }

      state.items = [...state.items, payload.item!];

      // returns original state including newly-added item in payload.
      return {
        ...state,
        ...getTotalItemsInFavourites(),
      };
    case ActionKind.REMOVE:
      return {
        ...filterRemovedItem(state, payload.id!),
        ...getTotalItemsInFavourites(),
      };
    default:
      return state;
  }
};

export default favouriteReducer;
