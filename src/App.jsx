import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/rootReducer";
import MainLayout from "./layouts/MainLayout";
import Main from "./views/Main";
import "./App.scss";
import "leaflet/dist/leaflet.css";
import BusDetail from "./views/BusDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Main />} />
              <Route path="/route/:key" element={<BusDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
