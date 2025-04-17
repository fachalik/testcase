/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { message } from "antd";

import AppLoader from "@/components/AppLoader";

import { useInfoViewStore } from "@/store/infoView";

const AppInfoView = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const clearInfoView = useInfoViewStore((state) => state.clearInfoView);
  const displayMessage = useInfoViewStore((state) => state.displayMessage);
  const error = useInfoViewStore((state) => state.error);
  const loading = useInfoViewStore((state) => state.loading);

  useEffect(() => {
    if (error) {
      messageApi.error(error);
      clearInfoView();
    }
  }, [error]);

  useEffect(() => {
    if (displayMessage) {
      messageApi.success(displayMessage);
      clearInfoView();
    }
  }, [displayMessage]);

  return (
    <>
      {loading ? <AppLoader /> : null}
      {contextHolder}
    </>
  );
};

export default AppInfoView;
