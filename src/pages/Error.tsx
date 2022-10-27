// import { useRouteError } from "react-router-dom";
import { SectionLayout } from "components/common";

const sectionStyles = {
  root: {
    backgroundColor: "#F9F9F9",
  },
  container: {
    width: "50%",
    margin: "0 auto",
    padding: "4rem",
  },
};

const Error = () => {
  return (
    <SectionLayout CSSProps={{ ...sectionStyles }}>
      <h1>Ooops.</h1>
      <p>Something unexpected happened.</p>
    </SectionLayout>
  );
};

export default Error;
