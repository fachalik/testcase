import React from "react";

import { Form } from "antd";

import { timeout } from "@/utils/utility";

import { useNavigate } from "react-router-dom";

import { useUpdateBarang, QUERY_KEY_DETAIL } from "@/service/barang/useBarang";

import { useQueryClient } from "@tanstack/react-query";

export default function useForm({ id }: { id: string }) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync } = useUpdateBarang();

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
    price: number;
    description: string;
  }

  const onFinish = async (params: IData) => {
    try {
      setIsLoading(true);

      await mutateAsync({ id, payload: params });

      await timeout(1000);
      setIsLoading(false);

      form.resetFields();

      queryClient.removeQueries({
        queryKey: [...QUERY_KEY_DETAIL, id],
        exact: true, // optional: only delete this exact key
      });
      navigate("/barang");
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
