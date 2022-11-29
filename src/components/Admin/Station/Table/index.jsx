import { useQuery } from "@tanstack/react-query";
import { Button, notification, Popconfirm, Space, Table, Tag } from "antd";
import { useState } from "react";
import { deleteStation } from "../../../../apis/station/deleteStation";
import { getListStation } from "../../../../apis/station/getListStation";
import ModalEditStation from "../ModalEdit";
import ModalNewStation from "../ModalNew";

const TableStation = ({ id }) => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [fetching, setIsFetching] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const { data } = useQuery({
    queryKey: ["getListStation", id, fetching],
    queryFn: () => getListStation(id),
  });

  const openNotification = (message) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "top",
    });
  };

  const handleEdit = (record) => {
    setIsEdit((x) => !x);
    setCurrentRecord(record);
  };

  const handleNew = () => {
    setIsNew((x) => !x);
  };

  const handleDelete = async (record) => {
    try {
      await deleteStation(record.id);
      openNotification("Delete station success!");
      setIsFetching((x) => !x);
    } catch (err) {
      openNotification("Error!");
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      align: "center",
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lat",
      dataIndex: "lat",
      key: "lat",
    },
    {
      title: "Lng",
      dataIndex: "lng",
      key: "lng",
    },
    {
      title: "Direction",
      dataIndex: "direction",
      key: "direction",
      filters: [
        {
          text: "forward",
          value: "forward",
        },
        {
          text: "back",
          value: "back",
        },
      ],
      onFilter: (value, record) => record.direction.indexOf(value) === 0,
    },
    {
      title: "Map direction",
      dataIndex: "mapDirection",
      key: "mapDirection",
      align: "center",
      render: (text) => (
        <Tag color={text === true ? "#73d13d" : "#595959"}>{String(text)}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <>
          <Space>
            <Popconfirm
              title="Are you sure to delete this station?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small">
                Delete
              </Button>
            </Popconfirm>

            <Button
              type="primary"
              onClick={() => handleEdit(record)}
              size="small"
            >
              Edit
            </Button>
          </Space>
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        style={{ marginBottom: "10px" }}
        onClick={() => handleNew()}
      >
        New station
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />;
      <ModalEditStation
        isModalOpen={isEdit}
        record={currentRecord}
        closeModal={setIsEdit}
        setIsFetching={setIsFetching}
        openNotification={openNotification}
      />
      <ModalNewStation
        isModalOpen={isNew}
        closeModal={setIsNew}
        routeId={id}
        setIsFetching={setIsFetching}
        openNotification={openNotification}
      />
    </>
  );
};

export default TableStation;
