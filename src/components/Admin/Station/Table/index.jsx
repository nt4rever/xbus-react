import { useQuery } from "@tanstack/react-query";
import { Button, Table, Tag } from "antd";
import { useState } from "react";
import { getListStation } from "../../../../apis/station/getListStation";
import ModalEditStation from "../ModalEdit";
import ModalNewStation from "../ModalNew";

const TableStation = ({ id }) => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [fetching, setIsFetching] = useState(false);

  const { data } = useQuery({
    queryKey: ["getListStation", id, fetching],
    queryFn: () => getListStation(id),
  });

  const handleEdit = (record) => {
    setIsEdit((x) => !x);
    setCurrentRecord(record);
  };

  const handleNew = () => {
    setIsNew((x) => !x);
  };

  const columns = [
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
          text: "backward",
          value: "backward",
        },
      ],
      onFilter: (value, record) => record.direction.indexOf(value) === 0,
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      align: "center",
      sorter: (a, b) => a.order - b.order,
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
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];
  return (
    <>
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
      />
      <ModalNewStation
        isModalOpen={isNew}
        closeModal={setIsNew}
        routeId={id}
        setIsFetching={setIsFetching}
      />
    </>
  );
};

export default TableStation;
