import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import BusRoute from "../BusRoute";
import Navigate from "../Navigate";

export const sideBarItems = [
  {
    id: 1,
    label: "Tra cứu",
    icon: <SearchOutlined />,
    children: <BusRoute />,
  },
  {
    id: 2,
    label: "Tìm đường",
    icon: <SendOutlined />,
    children: <Navigate />,
  },
];
