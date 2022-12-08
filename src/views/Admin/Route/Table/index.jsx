import {
  CarOutlined,
  CommentOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Space, Table, Tag } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { routeService } from "../../../../apis/route";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";

const RouteTable = () => {
  const { openRouteDetail, openStation, openRating } =
    useContext(RouteAdminContext);

  const { data } = useQuery({
    queryKey: ["getRoutes"],
    queryFn: routeService.getList,
  });

  const columns = [
    {
      title: "Route code",
      dataIndex: "routeCode",
      key: "routeCode",
      render: (text, record) => <Link to={`/route/${record.id}`}>{text}</Link>,
    },
    {
      title: "Route name",
      dataIndex: "routeName",
      key: "routeName",
      width: 400,
    },
    {
      title: "Ticket price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        return (
          <Tag color={status === "active" ? "#73d13d" : "#595959"}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Space size="small">
            <Button
              type="dashed"
              size="small"
              onClick={() => openRating(record)}
            >
              <CommentOutlined />
            </Button>
            <Button
              type="dashed"
              size="small"
              onClick={() => openStation(record)}
            >
              <CarOutlined />
            </Button>
            <Button
              type="dashed"
              size="small"
              onClick={() => openRouteDetail(record)}
            >
              <FullscreenOutlined />
            </Button>
          </Space>
        </>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection
      rowKey="id"
      scroll={{
        x: "1000px",
        y: "calc(100vh - 230px)",
      }}
    />
  );
};

export default RouteTable;
