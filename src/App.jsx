import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/rootReducer";
import MainLayout from "./layouts/MainLayout";
import Main from "./views/Main";
import "./App.scss";
import "antd/dist/antd.less";
import "leaflet/dist/leaflet.css";
import BusDetail from "./views/BusDetail";
import AdminLayout from "./layouts/AdminLayout";
import RouteMange from "./views/Admin/Route";
import UserMange from "./views/Admin/User";
import Dashboard from "./views/Admin/Dashboard";
import AuthGuard from "./components/Admin/AuthGuard";
import { JWTAuthProvider } from "./contexts/jwtAuthContext";
import { RouteAdminProvider } from "./contexts/routeAdminContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <JWTAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Main />} />
                <Route path="/route/:key" element={<BusDetail />} />
              </Route>
              <Route
                path="/admin"
                element={
                  <AuthGuard>
                    <AdminLayout />
                  </AuthGuard>
                }
              >
                <Route index element={<Dashboard />} />
                <Route
                  path="route"
                  element={
                    <RouteAdminProvider>
                      <RouteMange />{" "}
                    </RouteAdminProvider>
                  }
                />
                <Route path="user" element={<UserMange />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </JWTAuthProvider>
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
