import FormComponent from "./FormComponent";

import { useParams } from "react-router-dom";

import { useGetDetailBarang } from "@/service/barang/useBarang";
import { Spin } from "antd";

export default function CreateBarang() {
  const { id } = useParams();

  const { data, isLoading } = useGetDetailBarang({ id: id as string });

  return (
    <div>
      {isLoading && (
        <div>
          <Spin />
        </div>
      )}
      {!isLoading && data?.data !== null && <FormComponent data={data?.data} />}
    </div>
  );
}
