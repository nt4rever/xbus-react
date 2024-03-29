import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { ratingService } from "../../../../apis/rating";
import { convertTime } from "../../../../utils/time";

const TableRating = ({ id }) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["getRating", id],
    queryFn: () => ratingService.getById(id, 1000),
  });

  const deleteMutation = useMutation(ratingService.deleteByAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getRating"]);
    },
  });

  const handleDelete = async (record) => {
    try {
      await deleteMutation.mutateAsync(record.id, {
        onSuccess: () => {
          message.success("Deleted!");
        },
        onError: () => {
          message.error("Error!");
        },
      });
      // await ratingService.deleteByAdmin(record.id);
    } catch (err) {
      message.error("Error!");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time) => convertTime(time),
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <>
          <Space>
            <Popconfirm
              title="Are you sure to delete this rating?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small">
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" />;
    </>
  );
};

export default TableRating;
