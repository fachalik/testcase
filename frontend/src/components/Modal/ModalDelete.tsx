import { Button, Divider, Popconfirm } from "antd";
import { timeout } from "@/utils/utility";
import { useState } from "react";
interface IProps {
  onCancel: () => void;
  onSubmit: () => void;
  description: string;
  modalFor: string;
}

const ModalDelete = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await timeout(1000);
      await props.onSubmit();
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Divider />
      <p className="text-sm font-semibold text-justify">
        <span className="text-red-600">Permanent Deletion: </span>
        <span className="font-normal">{props.description}</span>
      </p>
      <Divider />
      <div className="flex justify-end gap-2">
        <Button
          disabled={isLoading}
          onClick={() => {
            props.onCancel();
          }}
        >
          Cancel
        </Button>
        <Popconfirm
          title={`Delete the ${props.modalFor}`}
          description={`Are you sure to delete this ${props.modalFor}?`}
          onConfirm={() => {
            handleSubmit();
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button danger loading={isLoading}>
            Delete
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default ModalDelete;
