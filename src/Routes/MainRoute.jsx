import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGuard from "../components/Admin/AuthGuard";
import { RouteAdminProvider } from "../contexts/routeAdminContext";
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../views/Admin/Dashboard";
import RouteMange from "../views/Admin/Route";
import UserMange from "../views/Admin/User";
import BusDetail from "../views/BusDetail";
import Main from "../views/Main";
import PageNotFound from "../views/Static/404";

const MainRoute = () => {
  return (
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
                <RouteMange />
              </RouteAdminProvider>
            }
          />
          <Route path="user" element={<UserMange />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoute;
