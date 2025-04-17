import React from "react";

import { Form } from "antd";

import useAuthStore from "@/store/auth";

import { timeout } from "@/utils/utility";

export default function useForm() {
  const { signInUser } = useAuthStore((state) => state);
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
    email: string;
    password: string;
  }

  const onFinish = async (params: IData) => {
    try {
      setIsLoading(true);
      await signInUser(params);
      await timeout(1000);

      setIsLoading(false);
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
