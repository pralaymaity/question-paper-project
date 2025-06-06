import "./index.css"
import Body from "../src/routes/Body";
import { AuthProvider } from "../src/features/auth/AuthProvider";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={appStore}>
      <AuthProvider>
        <Body />
      </AuthProvider>
    </Provider>
  );
}

export default App;
