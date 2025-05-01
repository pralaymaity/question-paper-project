import "./index.css"
import Body from "./components/Body";
import { AuthProvider } from "./components/AuthProvider";
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
