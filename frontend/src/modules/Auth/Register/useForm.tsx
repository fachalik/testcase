import React from "react";

import { Form } from "antd";

import useAuthStore from "@/store/auth";

import { timeout } from "@/utils/utility";

import { useNavigate } from "react-router-dom";

export default function useForm() {
  const navigate = useNavigate();
  const { signUpUser } = useAuthStore((state) => state);

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  interface ErrorField {
    name: string | number | (string | number)[];
    errors: string[];
  }

  interface OnFinishFailedParams {
    errorFields: ErrorField[];
  }

  const onFinishFailed = (errorInfo: OnFinishFailedParams) => {
    form.setFields(
      errorInfo.errorFields.map((field) => ({
        name: field.name,
        errors: field.errors,
      }))
    );
  };

  interface IData {
    name: string;
    email: string;
    password: string;
  }

  const onFinish = async (params: IData) => {
    try {
      setIsLoading(true);
      const redirect = await signUpUser(params);
      await timeout(1000);
      setIsLoading(false);
      if (redirect) {
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      console.log("err", err);
    }
  };

  return {
    form,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
