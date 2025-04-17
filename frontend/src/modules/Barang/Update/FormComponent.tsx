import { Form, Input, Typography, Button, InputNumber, Row, Col } from "antd";

import useForm from "./useForm";

import * as z from "zod";
import { zodToAntdRules } from "@/lib/zodToRulesAntd";

import { Rule } from "antd/es/form";

export interface IData {
  id: string;
  name: string;
  price: number;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IFormComponent {
  data: IData | undefined;
}

const FormComponent = ({ data }: IFormComponent) => {
  const formSchema = z.object({
    name: z
      .string()
      .min(5, { message: "name must be at least 5 characters" })
      .max(100, { message: "name cannot exceed 100 characters" }),
    price: z.number(),
    description: z
      .string()
      .min(5, { message: "description must be at least 5 characters" }),
  });

  const { form, isLoading, onFinish, onFinishFailed } = useForm({
    id: data?.id as string,
  });

  return (
    <>
      <div className="flex flex-col gap-4 h-full">
        <div>
          <Typography.Title level={4} className="font-semibold">
            Update Barang
          </Typography.Title>
          <Typography.Text className="text-sm text-gray-500">
            Please fill out the form below to create a new barang.
          </Typography.Text>
        </div>
        <div className="flex flex-col h-full">
          <Form
            form={form}
            initialValues={{
              name: data?.name ?? "",
              price: data?.price ?? "",
              description: data?.description ?? "",
            }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="flex flex-col gap-3"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Typography.Text className="font-semibold">
                  Name
                </Typography.Text>
                <Form.Item
                  name="name"
                  className="form-field"
                  style={{ marginBottom: "0px" }}
                  rules={zodToAntdRules(formSchema)["name"] as Rule[]}
                >
                  <Input placeholder="Laptop" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Typography.Text className="font-semibold">
                  Price
                </Typography.Text>
                <Form.Item
                  name="price"
                  className="form-field"
                  rules={zodToAntdRules(formSchema)["price"] as Rule[]}
                  style={{ marginBottom: "0px" }}
                >
                  <InputNumber
                    prefix="Rp"
                    name="price"
                    min={100}
                    defaultValue={100}
                    style={{ width: "100%" }}
                    placeholder="Please insert your price"
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Typography.Text className="font-semibold">
                  Description
                </Typography.Text>
                <Form.Item
                  name="description"
                  className="form-field"
                  rules={zodToAntdRules(formSchema)["description"] as Rule[]}
                  style={{ marginBottom: "0px" }}
                >
                  <Input.TextArea
                    placeholder="Please barang description"
                    autoSize={{ minRows: 5, maxRows: 10 }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className="form-btn-field">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className="uppercase"
                  >
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};
export default FormComponent;
