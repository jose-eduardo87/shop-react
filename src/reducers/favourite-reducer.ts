import { ItemInterface, ActionKind, filterRemovedItem, getHash } from "./index";

export interface FavouriteInterface {
  items: ItemInterface[];
  hash: { [key: string]: boolean };
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
    const totalItemsInFavourites = state.items.length;

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
        ...getHash(state),
      };
    case ActionKind.REMOVE:
      return {
        ...filterRemovedItem(state, payload.id!),
        ...getTotalItemsInFavourites(),
        ...getHash(state),
      };
    default:
      return state;
  }
};

export default favouriteReducer;
