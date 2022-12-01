import { Button, Form, Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createStation } from "../../../../apis/station/createStation";

const ModalNewStation = ({
  isModalOpen,
  closeModal,
  routeId,
  setIsFetching,
  openNotification,
}) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    closeModal(false);
  };

  const handleClear = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await createStation({
        ...values,
        lat: Number(values.lat),
        lng: Number(values.lng),
        order: Number(values.order),
        routeId,
      });
      openNotification("Create new station success!");
      setLoading(false);
      setIsFetching((x) => !x);
    } catch (err) {
      setLoading(false);
      openNotification("Error!");
    }
  };

  return (
    <>
      <Modal
        title="New station"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="clear" type="dashed" danger onClick={handleClear}>
            Clear
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="ok" type="primary" loading={loading} onClick={handleOk}>
            Save
          </Button>,
        ]}
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
          initialValues={{
            mapDirection: true,
          }}
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
            <Input type="number" step={"any"} />
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
            <Input type="number" step={"any"} />
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

export default ModalNewStation;
