import { Button, Drawer, Space, Form, Input, Select, Popconfirm } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";
import { updateRoute } from "./../../../../apis/route/updateRoute";
import { deleteRoute } from "./../../../../apis/route/deleteRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const RouteDetail = () => {
  const queryClient = useQueryClient();
  const { isDetail, closeRouteDetail, record, openNotification } =
    useContext(RouteAdminContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const editMutation = useMutation(updateRoute, {
    onSuccess: () => queryClient.invalidateQueries(["getRoutes"]),
  });

  const deleteMutation = useMutation(deleteRoute, {
    onSuccess: () => queryClient.invalidateQueries(["getRoutes"]),
  });

  useEffect(() => {
    form.setFieldsValue(record);
  }, [form, record]);

  const onSave = () => {
    form.submit();
  };

  const onClose = () => {
    closeRouteDetail();
  };

  const onFinish = (values) => {
    setLoading(true);
    editMutation.mutate(
      { id: record?.id, values },
      {
        onSuccess: () => {
          openNotification("Save success!");
          setLoading(false);
        },
        onError: (err) => {
          console.log(err);
          openNotification("Error!");
          setLoading(false);
        },
      }
    );
  };

  const deleteConfirm = async () => {
    setLoading(true);
    deleteMutation.mutate(record?.id, {
      onSuccess: () => {
        openNotification("Delete success!");
        closeRouteDetail();
        setLoading(false);
      },
      onError: () => {
        openNotification("Error!");
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Drawer
        title={`Route detail`}
        placement="right"
        size="large"
        onClose={onClose}
        open={isDetail}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onSave} loading={loading}>
              Save
            </Button>
          </Space>
        }
      >
        <div>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Route code"
              name="routeCode"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Route name"
              name="routeName"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Forward trip"
              name="forwardTrip"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input.TextArea showCount />
            </Form.Item>
            <Form.Item
              label="Backward trip"
              name="backwardTrip"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input.TextArea showCount />
            </Form.Item>
            <Form.Item
              label="Between two bus"
              name="betweenTwoBus"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Number of trips"
              name="numberOfTrips"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Operating time"
              name="operatingTime"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Route length"
              name="routeLength"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ticket price"
              name="ticketPrice"
              rules={[
                {
                  required: true,
                  message: "Not empty",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="hide">Hide</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div style={{ textAlign: "center" }}>
          <Popconfirm
            title="Are you sure to delete this route?"
            onConfirm={deleteConfirm}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete route</Button>
          </Popconfirm>
        </div>
      </Drawer>
    </>
  );
};

export default RouteDetail;
