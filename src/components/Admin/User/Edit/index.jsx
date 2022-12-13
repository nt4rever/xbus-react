import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, message, Select, Space, Tag } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { userService } from "../../../../apis/user";

const EditUser = ({ data, isOpen, closeHandle }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const editMutation = useMutation(userService.updateByAdmin, {
    onSuccess: () => queryClient.invalidateQueries(["getListUser"]),
  });

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onClose = () => {
    closeHandle(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    await editMutation.mutateAsync(
      { ...values, id: data.id },
      {
        onSuccess: () => {
          setLoading(false);

          message.success("Update success!");
        },
        onError: (err) => {
          setLoading(false);
          console.log(err);
          message.error("Update error!");
        },
      }
    );
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const tagColor = {
      admin: "#C58940",
      user: "#CCD6A6",
    };

    return (
      <Tag
        color={tagColor[value]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const options = [
    {
      value: "admin",
    },
    {
      value: "user",
    },
  ];

  return (
    <Drawer
      title={`User detail`}
      placement="right"
      size="large"
      onClose={onClose}
      open={isOpen}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
            loading={loading}
          >
            Save
          </Button>
        </Space>
      }
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
          label="firstName"
          name="firstName"
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
          label="lastName"
          name="lastName"
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
          label="email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Not empty",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="address"
          name="address"
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
          label="dateOfBirth"
          name="dateOfBirth"
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
          label="status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="roles"
          name="roles"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            style={{
              width: "100%",
            }}
            options={options}
          />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              min: 6,
              max: 16,
              message: "Password length is between 6 to 16 character",
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditUser;
