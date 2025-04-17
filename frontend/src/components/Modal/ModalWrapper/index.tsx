import React from "react";

import { Modal } from "antd";

type IProps = {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
  title: string;
  width?: number;
  closable?: boolean;
};

const ModalWrapper = (props: IProps) => {
  return (
    <Modal
      title={props.title}
      width={props.width ? `${props.width}em` : "40em"}
      onCancel={() => {
        props.onClose();
      }}
      open={props.open}
      zIndex={20}
      footer={null}
      centered
      closable={props.closable ?? true} // Prevents the close button from showing
      maskClosable={props.closable ?? true} // Prevents closing by clicking on the mask
      keyboard={props.closable ?? true} // Prevents closing with the ESC key
    >
      {props.children}
    </Modal>
  );
};

export default ModalWrapper;
