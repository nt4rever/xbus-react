import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, Select } from "antd";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { stationService } from "../../../../apis/station";
import { RouteAdminContext } from "../../../../contexts/routeAdminContext";

const ModalEditStation = ({ isModalOpen, closeModal, record }) => {
  const queryClient = useQueryClient();
  const { openNotification } = useContext(RouteAdminContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const editMutation = useMutation(stationService.update, {
    onSuccess: () => queryClient.invalidateQueries(["getListStation"]),
  });

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
    setLoading(true);
    await editMutation.mutateAsync(
      {
        ...values,
        lat: Number(values.lat),
        lng: Number(values.lng),
        order: Number(values.order),
        id: record.id,
        routeId: record.routeId,
      },
      {
        onSuccess: () => {
          openNotification("Update station success!");
          setLoading(false);
        },
        onError: (err) => {
          console.log(err);
          setLoading(false);
          openNotification("Error!");
        },
      }
    );
  };

  return (
    <>
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
