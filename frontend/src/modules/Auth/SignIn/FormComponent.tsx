import { Form, Input, Typography, Button } from "antd";

import useForm from "./useForm";

import * as z from "zod";
import { zodToAntdRules } from "@/lib/zodToRulesAntd";

import { Rule } from "antd/es/form";

import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z
      .string()
      .min(10, { message: "email must be at least 10 characters" }) // Length Input: 10-100 Characters
      .max(100, { message: "email cannot exceed 100 characters" })
      .email("Invalid email"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }) // Length Input: 8-20 Characters
      .max(20, { message: "Password cannot exceed 20 characters" }),
  });

  const { form, isLoading, onFinish, onFinishFailed } = useForm();

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full">
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="flex flex-col gap-1 mb-5">
              <div>
                <Typography.Text className="font-semibold">
                  Email
                </Typography.Text>
                <Form.Item
                  style={{ marginBottom: "0px" }}
                  name="email"
                  className="form-field"
                  rules={zodToAntdRules(formSchema)["email"] as Rule[]}
                >
                  <Input placeholder="Johndoe@gmail.com" />
                </Form.Item>
              </div>
              <div>
                <Typography.Text className="font-semibold">
                  Password
                </Typography.Text>
                <Form.Item
                  style={{ marginBottom: "0px" }}
                  name="password"
                  className="form-field"
                  rules={zodToAntdRules(formSchema)["password"] as Rule[]}
                >
                  <Input.Password placeholder="Please insert your password" />
                </Form.Item>
              </div>
            </div>
            <div className="form-btn-field">
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="uppercase"
              >
                Sign In
              </Button>
            </div>
          </Form>
          <Typography.Text className="text-center mt-3">
            Don’t have an account?{" "}
            <span
              onClick={() => {
                navigate("/register");
              }}
              className="text-black font-bold cursor-pointer"
            >
              Please Register
            </span>
          </Typography.Text>
        </div>
      </div>
    </>
  );
};
export default FormComponent;
