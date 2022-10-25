import { FC } from "react";
import { Menu, MenuItem } from "components/ui/index";
import { Favourite } from "components/icons";
import { iconStyles } from "helpers/constants";

const FavouriteMenu: FC = () => {
  return (
    <Menu label={<Favourite {...iconStyles} />}>
      <h1>Your favourites:</h1>
      {["hat", "t-shirt", "clock"].map((name, id) => (
        <MenuItem key={id} name={name} />
      ))}
    </Menu>
  );
};

export default FavouriteMenu;
