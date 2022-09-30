import { Navbar, PageLayout } from "components/common/index";

import "./App.css";

const App = () => {
  return (
    <div className="App">
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
    </div>
  );
};

export default App;
