import {
  CategoriesGrid,
  PaymentInfo,
  ProductsOnHome,
} from "components/sections/index";
import { Hero } from "components/ui/index";
import { ITEMS } from "helpers/constants";

const Home = () => {
  return (
    <>
      <Hero />
      <PaymentInfo />
      <CategoriesGrid />
      <ProductsOnHome title="Featured" products={ITEMS.slice(0, 5)} />
      <ProductsOnHome
        title="Cheapest"
        products={ITEMS.sort((a, b) => a.price - b.price).slice(0, 5)}
      />
    </>
  );
};

export default Home;
