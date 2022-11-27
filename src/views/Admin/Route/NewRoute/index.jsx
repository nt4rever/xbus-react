import { Button, Drawer, Space, Form, Input, Select, notification } from "antd";
import { useState } from "react";
import { useContext } from "react";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";
import { createRoute } from "./../../../../apis/route/createRoute";

const NewRoute = () => {
  const { isNew, newHandle, refetchHandle } = useContext(RouteAdminContext);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const openNotification = (message) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "top",
    });
  };

  const onSave = () => {
    form.submit();
  };

  const onClose = () => {
    form.resetFields();
    newHandle();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await createRoute(values);
      openNotification("Create route success!");
      setLoading(false);
      refetchHandle();
    } catch (err) {
      setLoading(false);
      openNotification("Error!");
    }
  };
  return (
    <>
      {contextHolder}
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
              label="betweenTwoBus"
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
              label="numberOfTrips"
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
              label="operatingTime"
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
              label="routeLength"
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
              label="ticketPrice"
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
            <Form.Item label="Status" name="status">
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
