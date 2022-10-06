import { Navbar, PageLayout } from "components/common/index";
import { CartProvider } from "store/index";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <PageLayout
          CSSProps={{
            root: {
              backgroundColor: "#F9F9F9",
            },
            container: {
              width: "80%",
              margin: "0 auto",
            },
          }}
        >
          <div>Hello, world!</div>
        </PageLayout>
      </CartProvider>
    </div>
  );
};

export default App;
