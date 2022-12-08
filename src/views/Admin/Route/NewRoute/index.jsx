import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Space, Form, Input, Select } from "antd";
import { useState } from "react";
import { useContext } from "react";
import { routeService } from "../../../../apis/route";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";

const NewRoute = () => {
  const queryClient = useQueryClient();
  const { isNew, newHandle, openNotification } = useContext(RouteAdminContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const createMutation = useMutation(routeService.create, {
    onSuccess: () => queryClient.invalidateQueries(["getRoutes"]),
  });

  const onSave = () => {
    form.submit();
  };

  const onClose = () => {
    form.resetFields();
    newHandle();
  };

  const onFinish = async (values) => {
    setLoading(true);
    createMutation.mutate(values, {
      onSuccess: () => {
        openNotification("Create route success!");
        setLoading(false);
      },
      onError: (err) => {
        console.log(err);
        setLoading(false);
        openNotification("Error!");
      },
    });
  };
  return (
    <>
      <Drawer
        title={`New route`}
        placement="right"
        size="large"
        onClose={onClose}
        open={isNew}
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
      </Drawer>
    </>
  );
};

export default NewRoute;
