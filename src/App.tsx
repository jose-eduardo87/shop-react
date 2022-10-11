import { Navbar } from "components/common/index";
import { Highlights, PaymentInfo } from "components/sections/index";
import { Hero } from "components/ui/index";
import { CartProvider } from "store/index";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <Hero />
        <PaymentInfo />
        <Highlights />
      </CartProvider>
    </div>
  );
};

export default App;
