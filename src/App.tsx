import { RouterProvider } from "react-router-dom";
import router from "./router";
import { LinkContextProvider } from "./assets/context/LinkContext";

function App() {
  return (
    <>
      <LinkContextProvider>
        <RouterProvider router={router} />
      </LinkContextProvider>
    </>
  );
}

export default App;
