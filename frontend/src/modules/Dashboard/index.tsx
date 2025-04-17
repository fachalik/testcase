import { useGetDashboard } from "@/service/barang/useBarang";
import { Spin } from "antd";
import DashboardComponent from "./DashboardComponent";

export default function Dashboard() {
  const { data, isLoading } = useGetDashboard();

  return (
    <div>
      {isLoading && <Spin />}
      <DashboardComponent data={data?.data ?? null} />
    </div>
  );
}
