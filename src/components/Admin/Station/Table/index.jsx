import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Switch, Table, Tag } from "antd";
import { useContext, useState, useCallback, useRef, useMemo } from "react";
import ModalEditStation from "../ModalEdit";
import ModalNewStation from "../ModalNew";
import update from "immutability-helper";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";
import { stationService } from "../../../../apis/station";
import useSearchTable from "../../../../hooks/useSearchTable";

const type = "DraggableBodyRow";

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = useRef(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{
        cursor: "move",
        ...style,
      }}
      {...restProps}
    />
  );
};

const TableStation = ({ id }) => {
  const queryClient = useQueryClient();
  const { openNotification } = useContext(RouteAdminContext);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [direction, setDirection] = useState(true);
  const [dragData, setDragData] = useState([]);
  const getColumnSearchProps = useSearchTable();

  const { data } = useQuery({
    queryKey: ["getListStation", id],
    queryFn: () => stationService.getList(id),
    refetchOnWindowFocus: false,
  });

  const dataTable = useMemo(() => {
    if (dragData.length > 0) {
      return dragData;
    }
    if (data) {
      const currentDirection = direction ? "forward" : "back";
      return data.filter((x) => x.direction === currentDirection);
    }
    return [];
  }, [data, direction, dragData]);

  const deleteMutation = useMutation(stationService.destroy, {
    onSuccess: () => queryClient.invalidateQueries(["getListStation"]),
  });

  const handleEdit = (record) => {
    setIsEdit((x) => !x);
    setCurrentRecord(record);
  };

  const handleNew = () => {
    setIsNew((x) => !x);
  };

  const handleDelete = async (record) => {
    await deleteMutation.mutateAsync(record.id, {
      onSuccess: () => openNotification("Delete station success!"),
      onError: (err) => {
        openNotification("Error!");
        console.log(err);
      },
    });
  };

  const updateMutation = useMutation(stationService.updateList, {
    onSuccess: () => queryClient.invalidateQueries(["getListStation"]),
  });

  const handleSaveOrder = async () => {
    if (dragData.length > 0)
      await updateMutation.mutateAsync(dragData, {
        onSuccess: () => {
          openNotification("Save success!");
        },
        onError: (err) => {
          openNotification("Error!");
          console.log(err);
        },
      });
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
      ...getColumnSearchProps("name"),
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

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = dataTable[dragIndex];
      const newData = update(dataTable, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      const dataReset = newData.map((item, index) => {
        item.order = index + 1;
        return item;
      });
      setDragData(dataReset);
    },
    [dataTable]
  );

  return (
    <>
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Space>
          <Button type="primary" onClick={() => handleNew()}>
            New station
          </Button>
          <Popconfirm
            title="Are you sure to save this current order?"
            onConfirm={handleSaveOrder}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Save</Button>
          </Popconfirm>
        </Space>
        <Switch
          checkedChildren="Lượt đi"
          unCheckedChildren="Lượt về"
          checked={direction}
          onChange={() => setDirection((x) => !x)}
        />
      </Space>
      <DndProvider backend={HTML5Backend}>
        <Table
          columns={columns}
          dataSource={dataTable}
          rowKey="id"
          components={components}
          onRow={(_, index) => {
            const attr = {
              index,
              moveRow,
            };
            return attr;
          }}
          pagination={{
            pageSizeOptions: [10, 25, 50, 100],
            showSizeChanger: true,
          }}
        />
      </DndProvider>
      <ModalEditStation
        isModalOpen={isEdit}
        record={currentRecord}
        closeModal={setIsEdit}
      />
      <ModalNewStation isModalOpen={isNew} closeModal={setIsNew} routeId={id} />
    </>
  );
};

export default TableStation;
