import { Form, Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { updateStation } from "../../../../apis/station/updateStation";

const ModalEditStation = ({
  isModalOpen,
  closeModal,
  record,
  setIsFetching,
}) => {
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
  }, [record]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    closeModal(false);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateStation({
        ...values,
        lat: Number(values.lat),
        lng: Number(values.lng),
        order: Number(values.order),
        id: record.id,
        routeId: record.routeId,
      });
      openNotification("Update station success!");
      setLoading(false);
      setIsFetching((x) => !x);
    } catch (err) {
      setLoading(false);
      openNotification("Error!");
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Edit station"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
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
            label="Lat"
            name="lat"
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
            label="Lng"
            name="lng"
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
            label="Order"
            name="order"
            rules={[
              {
                required: true,
                message: "Not empty",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Direction"
            name="direction"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Select.Option value="forward">Forward</Select.Option>
              <Select.Option value="back">Back</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Map direction"
            name="mapDirection"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Select.Option value={true}>True</Select.Option>
              <Select.Option value={false}>False</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditStation;
