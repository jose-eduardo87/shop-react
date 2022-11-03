import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Categories, Error } from "pages/index";
import { Navbar, Footer } from "components/common/index";
import { CartProvider, FavouriteProvider } from "store/index";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <CartProvider>
        <FavouriteProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categories/:categoriesId" element={<Categories />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </FavouriteProvider>
      </CartProvider>
      <Footer />
    </div>
  );
};

export default App;
