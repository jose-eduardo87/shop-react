import { FC } from "react";
import { Menu, FavouriteItem } from "components/ui/index";
import { Favourite } from "components/icons";
import { EmptyFavourite } from "components/icons/index";
import { useFavourite } from "store/index";
import { iconStyles } from "helpers/constants";

const FavouriteMenu: FC = () => {
  const { favourites } = useFavourite();

  return (
    <Menu label={<Favourite {...iconStyles} />}>
      <h1>Your favourites:</h1>
      <div>
        {favourites.totalItemsInFavourites ? (
          favourites.items.map((item) => (
            <FavouriteItem key={item.id} item={item} />
          ))
        ) : (
          <p>
            <EmptyFavourite {...iconStyles} fill="#818181" /> No items added.
          </p>
        )}
      </div>
    </Menu>
  );
};

export default FavouriteMenu;
