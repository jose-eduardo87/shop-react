import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  ActionKind,
  ItemInterface,
  favouriteReducer,
  FavouriteInterface,
} from "reducers/index";

interface FavouriteProviderInterface {
  favourites: FavouriteInterface;
  onAddItemToFavourite: (item: ItemInterface) => void;
  onRemoveItemFromFavourite: (id: string) => void;
}

const initialState = {
  favourites: {
    items: [],
    totalItemsInFavourites: 0,
  },
  onAddItemToFavourite: (item: ItemInterface) => {},
  onRemoveItemFromFavourite: (id: string) => {},
};

const FavouriteContext =
  createContext<FavouriteProviderInterface>(initialState);

const FavouriteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const state = {
    items: [],
    totalItemsInFavourites: 0,
  };
  const [favourites, dispatch] = useReducer(favouriteReducer, state);
  const addItemHandler = (item: ItemInterface) =>
    dispatch({ type: ActionKind.ADD, payload: { item } });
  const removeItemHandler = (id: string) =>
    dispatch({ type: ActionKind.REMOVE, payload: { id } });

  return (
    <FavouriteContext.Provider
      value={{
        favourites: useMemo(() => favourites, [favourites]),
        onAddItemToFavourite: useCallback((item) => addItemHandler(item), []),
        onRemoveItemFromFavourite: useCallback(
          (id) => removeItemHandler(id),
          []
        ),
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;

export const useFavourite = () => useContext(FavouriteContext);
