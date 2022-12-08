import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MainRoute from "./Routes/MainRoute";
import { ConfigProvider } from "antd";
import { theme } from "./themes/MainTheme";
import LoadingFullPage from "./components/Loader/Loading";
import store, { persistor } from "./store";
import "./App.scss";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingFullPage />} persistor={persistor}>
        <ConfigProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <MainRoute />
            <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
          </QueryClientProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
