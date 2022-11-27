import { Button, Drawer, Space, Form, Input, Select, notification } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";
import { updateRoute } from "./../../../../apis/route/updateRoute";
const RouteDetail = () => {
  const { isDetail, closeRouteDetail, record, refetchHandle } =
    useContext(RouteAdminContext);
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

  useEffect(() => {
    form.setFieldsValue(record);
  }, [form, record]);

  const onSave = () => {
    form.submit();
  };

  const onClose = () => {
    closeRouteDetail();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateRoute(record?.id, values);
      openNotification("Save success!");
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
              span: 4,
            }}
            wrapperCol={{
              span: 18,
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

export default RouteDetail;
