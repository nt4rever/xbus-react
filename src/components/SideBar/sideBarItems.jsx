import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import BusRoute from "../BusRoute";

export const sideBarItems = [
  {
    id: 1,
    lable: "Tra cứu",
    icon: <SearchOutlined />,
    children: <BusRoute />,
  },
  {
    id: 2,
    lable: "Tìm đường",
    icon: <SendOutlined />,
    children: "Tìm đường",
  },
];
