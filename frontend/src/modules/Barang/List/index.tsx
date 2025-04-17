import { useState } from "react";

import { useGetListBarang, useDeleteUser } from "@/service/barang/useBarang";
import { Button, Input, Pagination, Tooltip, Typography } from "antd";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import Table, { ColumnsType } from "antd/es/table";
import { idrFormatter } from "@/utils/utility";
import useBolean from "@/hooks/useBoolean";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import ModalDelete from "@/components/Modal/ModalDelete";
export default function ListBarang() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [name, setName] = useState<string>("");
  const [dataDelete, setDataDelete] = useState<BarangRecord | null>(null);

  const { active: activeDelete, off: offDelete, on: onDelete } = useBolean();

  const { mutateAsync } = useDeleteUser();

  const { data, isLoading, refetch } = useGetListBarang({
    page,
    pageSize,
    search: name,
  });

  const paginateData = data?.data.paginatedData ?? [];
  const meta = data?.data?.meta;

  const handleSearchName = (value: string) => {
    setPage(1);
    setName(value);
  };

  const handleClearSearch = () => {
    setName("");
    setPage(1);
  };

  interface BarangRecord {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
  }

  const columns: ColumnsType<BarangRecord> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <div className="flex gap-2 items-center">{name}</div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (name: string) => (
        <div className="flex gap-2 items-center">{name}</div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (name: number) => (
        <div className="flex gap-2 items-center">{idrFormatter(name)}</div>
      ),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (name: string) => (
        <div>
          <Typography.Text className="text-xs">
            {name ? moment(name).format("LLLL") : "-"}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (name: string) => (
        <div>
          <Typography.Text className="text-xs">
            {name ? moment(name).format("LLLL") : "-"}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      className: "order-table-action",
      fixed: "right",
      render: (_name, record) => {
        return (
          <div className="flex gap-2 items-center justify-center">
            <Tooltip title="Show Detail">
              <Button
                icon={
                  <EyeOutlined
                    style={{ width: 16 }}
                    onClick={() => {
                      console.log("record", record);
                      navigate(`/barang/${record.id}`);
                    }}
                  />
                }
                type="text"
              />
            </Tooltip>
            <Tooltip title="Delete User">
              <Button
                icon={<DeleteOutlined style={{ width: 16 }} />}
                type="text"
                onClick={() => {
                  // console.log("record", record);
                  setDataDelete(record);
                  onDelete();
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col justify-between md:flex-row gap-3 overflow-auto p-3">
          <Button
            className="w-full md:w-[150px]"
            icon={<PlusOutlined />}
            onClick={() => navigate("/barang/create")}
            type="primary"
          >
            <span className="text-sm">Create Barang</span>
          </Button>

          <div className="flex flex-col gap-3 md:flex-row">
            <Input.Search
              className="w-full md:w-[200px]"
              onSearch={handleSearchName}
              onClear={handleClearSearch}
              allowClear
              id="user-name"
              placeholder="Search Name"
              type="search"
            />
          </div>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <div className="flex-1 overflow-auto max-h-[450px] md:max-h-[500px] p-3">
            <Table
              loading={isLoading}
              dataSource={paginateData ?? []}
              columns={columns}
              pagination={false}
              scroll={{ y: 400 }} // <-- Adjust to fit your layout
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Pagination
          totalBoundaryShowSizeChanger={1}
          total={meta?.totalItems ?? 0}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onShowSizeChange={(_current, size) => {
            setPage(1);
            setPageSize(size);
          }}
          defaultPageSize={pageSize}
          defaultCurrent={page}
          onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
      <ModalWrapper
        onClose={offDelete}
        open={activeDelete}
        title={`Permanently delete this barang ${dataDelete?.name ?? "-"}`}
      >
        <ModalDelete
          description="Once a barang is deleted, data are
          permanently removed."
          modalFor="barang"
          onCancel={() => {
            offDelete();
            setDataDelete(null);
          }}
          onSubmit={async () => {
            if (dataDelete?.id) {
              await mutateAsync({ id: dataDelete.id });
            }
            await offDelete();
            await setDataDelete(null);
            await refetch();
          }}
        />
      </ModalWrapper>
    </div>
  );
}
