import AppNavigator from "./src/navigation/AppNavigator";

import { Provider } from "react-redux";
import { store } from "./src/store/store";
import "./global.css";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
