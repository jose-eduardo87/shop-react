import { useEffect } from "react";
import { Navbar, Footer } from "components/common/index";
import {
  CategoriesGrid,
  Products,
  PaymentInfo,
} from "components/sections/index";
import { Hero } from "components/ui/index";
import { CartProvider, FavouriteProvider } from "store/index";
import { ITEMS } from "helpers/constants";

import "./App.css";

const App = () => {
  useEffect(() => {
    document.title = "React Store.";
  }, []);

  return (
    <div className="App">
      <CartProvider>
        <FavouriteProvider>
          <Navbar />
          <Hero />
          <PaymentInfo />
          <CategoriesGrid />
          <Products title="Featured" products={ITEMS} />
          <Products
            title="Cheapest"
            // products={ITEMS.sort((a, b) => a.price - b.price).slice(0, 5)}
            products={ITEMS}
          />
        </FavouriteProvider>
      </CartProvider>
      <Footer />
    </div>
  );
};

export default App;
