import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BarangAPI } from "./index";
import {
  GetAllDataResponse,
  GetBarangPayload,
  GetDetailDataResponse,
  PayloadBarang,
  ResponseDashboard,
} from "./model";

import { useInfoViewStore } from "@/store/infoView";

export const QUERY_KEY = ["BARANG"];
export const QUERY_KEY_DETAIL = ["DETAIL_BARANG"];
export const QUERY_KEY_DASHBOARD = ["DASHBOARD_BARANG"];

const fetchGetBarangDashboard = async (): Promise<ResponseDashboard> => {
  try {
    const data = await BarangAPI.getDashboard();

    return data;
  } catch (error) {
    console.error("Error parsing data:", error);
    throw error;
  }
};

export const useGetDashboard = () => {
  return useQuery<ResponseDashboard, Error>({
    queryKey: [QUERY_KEY_DASHBOARD],
    queryFn: () => fetchGetBarangDashboard(),
  });
};

// ----

const fetchGetBarang = async (
  payload: GetBarangPayload
): Promise<GetAllDataResponse> => {
  try {
    const data = await BarangAPI.getAllBarang(payload);

    return data;
  } catch (error) {
    console.error("Error parsing data:", error);
    throw error;
  }
};

export const useGetListBarang = (payload: GetBarangPayload) => {
  return useQuery<GetAllDataResponse, Error>({
    queryKey: [QUERY_KEY, payload],
    queryFn: () => fetchGetBarang(payload),
  });
};

// -----

const fetchGetDetailBarang = async (payload: {
  id: string;
}): Promise<GetDetailDataResponse> => {
  try {
    const data = await BarangAPI.getDetailData(payload);

    return data;
  } catch (error) {
    console.error("Error parsing data:", error);
    throw error;
  }
};

export const useGetDetailBarang = (payload: { id: string }) => {
  return useQuery<GetDetailDataResponse, Error>({
    queryKey: [...QUERY_KEY_DETAIL, payload.id],
    queryFn: () => fetchGetDetailBarang(payload),
    enabled: !!payload.id,
    staleTime: 0,
  });
};

// -----

const fetchDataBarang = async (
  payload: PayloadBarang
): Promise<GetDetailDataResponse> => {
  const data = await BarangAPI.createBarang(payload);
  return data;
};

export const useSubmitBarang = () => {
  const { showMessage, fetchError } = useInfoViewStore();
  const queryClient = useQueryClient();
  return useMutation<GetDetailDataResponse, Error, PayloadBarang>({
    mutationFn: fetchDataBarang,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      await showMessage("Barang created successfully");
    },
    onError: (error) => {
      console.error(error);
      fetchError(error.message);
    },
  });
};

// -----

const fetchUpdateBarang = async ({
  payload,
  id,
}: {
  id: string;
  payload: PayloadBarang;
}): Promise<GetDetailDataResponse> => {
  const data = await BarangAPI.updateBarang({ payload, id });
  return data;
};

export const useUpdateBarang = () => {
  const { showMessage, fetchError } = useInfoViewStore();
  const queryClient = useQueryClient();
  return useMutation<
    GetDetailDataResponse,
    Error,
    { payload: PayloadBarang; id: string }
  >({
    mutationFn: fetchUpdateBarang,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      await showMessage("Barang updated successfully");
    },
    onError: (error) => {
      console.error(error);
      fetchError(error.message);
    },
  });
};

// -----

const fetchDeleteUser = async ({
  id,
}: {
  id: string;
}): Promise<GetDetailDataResponse> => {
  const data = await BarangAPI.deleteBarang({ id });
  return data;
};

export const useDeleteUser = () => {
  const { showMessage, fetchError } = useInfoViewStore();
  const queryClient = useQueryClient();
  return useMutation<GetDetailDataResponse, Error, { id: string }>({
    mutationFn: fetchDeleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      await showMessage("Barang deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      fetchError(error.message);
    },
  });
};
