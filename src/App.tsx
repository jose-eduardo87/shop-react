import { useEffect } from "react";
import { Navbar } from "components/common/index";
import {
  CategoriesGrid,
  Products,
  PaymentInfo,
} from "components/sections/index";
import { Hero } from "components/ui/index";
import { CartProvider } from "store/index";
import { ITEMS } from "helpers/constants";

import "./App.css";

const App = () => {
  useEffect(() => {
    document.title = "React Store.";
  });

  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <Hero />
        <PaymentInfo />
        <CategoriesGrid />
        <Products title="Highlights" products={ITEMS.slice(0, 5)} />
      </CartProvider>
    </div>
  );
};

export default App;
