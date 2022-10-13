import { ItemInterface, ActionKind } from "./cart-reducer";

interface FavouriteAction {
  type: Omit<ActionKind, ActionKind.INCREMENT | ActionKind.DECREMENT>;
  payload: {
    id?: string;
    item?: ItemInterface;
  };
}

const favouriteReducer = (
  state: ItemInterface[],
  action: FavouriteAction
) => {};

export default favouriteReducer;
