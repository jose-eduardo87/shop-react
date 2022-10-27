import {
  CategoriesGrid,
  PaymentInfo,
  Products,
} from "components/sections/index";
import { Hero } from "components/ui/index";
import { ITEMS } from "helpers/constants";

const Home = () => {
  return (
    <>
      <Hero />
      <PaymentInfo />
      <CategoriesGrid />
      <Products title="Featured" products={ITEMS.slice(0, 5)} />
      <Products
        title="Cheapest"
        products={ITEMS.sort((a, b) => a.price - b.price).slice(0, 5)}
      />
    </>
  );
};

export default Home;
