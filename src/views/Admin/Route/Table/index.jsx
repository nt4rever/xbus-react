import {
  CarOutlined,
  CommentOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Space, Table, Tag } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { getListRoute } from "../../../../apis/route/getListRoute";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";

const RouteTable = () => {
  const { openRouteDetail, refetch, openStation } =
    useContext(RouteAdminContext);

  const { data } = useQuery({
    queryKey: ["getRoutes", refetch],
    queryFn: getListRoute,
  });

  const handleViewClick = (record) => {
    openRouteDetail(record);
  };

  const handleStationClick = (record) => {
    openStation(record);
  };
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
            <Button type="dashed" size="small">
              <CommentOutlined />
            </Button>
            <Button
              type="dashed"
              size="small"
              onClick={() => handleStationClick(record)}
            >
              <CarOutlined />
            </Button>
            <Button
              type="dashed"
              size="small"
              onClick={() => handleViewClick(record)}
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
