import { useQuery } from "@tanstack/react-query";
import { Button, Space, Table, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userService } from "../../../../apis/user";
import EditUser from "../Edit";

const TableUser = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data } = useQuery({
    queryFn: userService.getAll,
    queryKey: ["getListUser"],
  });

  const tagColor = {
    admin: "#C58940",
    user: "#CCD6A6",
  };

  const columns = [
    {
      title: "*",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, _record, index) => `${index + 1}`,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => (
        <>
          {roles.map((value, index) => (
            <Tag color={tagColor[value]} key={index}>
              {value}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "#73d13d" : "#595959"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <>
          <Space>
            <Button
              type="primary"
              size="small"
              disabled={record.id === user.id ? true : false}
              onClick={() => {
                setCurrentRecord(record);
                setIsEdit(true);
              }}
            >
              Edit
            </Button>
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <EditUser isOpen={isEdit} closeHandle={setIsEdit} data={currentRecord} />
    </div>
  );
};

export default TableUser;
