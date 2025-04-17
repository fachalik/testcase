import request from "@/lib/request";
import { handleError } from "@/lib/service_handle_error";
import {
  PayloadBarang,
  GetAllDataResponse,
  GetDetailDataResponse,
  GetBarangPayload,
  ResponseDashboard,
} from "./model";

const service = "BarangAPI";

export const BarangAPI = {
  async getDashboard(): Promise<ResponseDashboard> {
    try {
      const response = await request.get<ResponseDashboard>(
        "/barang/dashboard"
      );
      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },

  async getAllBarang(params: GetBarangPayload): Promise<GetAllDataResponse> {
    try {
      const queryParams: Record<string, string | number | undefined> = {
        pageSize: params.pageSize,
        page: params.page,
        search: params.search,
      };

      const response = await request.get<GetAllDataResponse>("/barang/data", {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },

  async getDetailData({ id }: { id: string }): Promise<GetDetailDataResponse> {
    try {
      const response = await request.get<GetDetailDataResponse>(
        `/barang/data/${id}`
      );
      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },

  async createBarang(payload: PayloadBarang): Promise<GetDetailDataResponse> {
    try {
      const response = await request.post<GetDetailDataResponse>(
        "/barang/create",
        payload
      );
      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },

  async updateBarang({
    payload,
    id,
  }: {
    payload: PayloadBarang;
    id: string;
  }): Promise<GetDetailDataResponse> {
    try {
      const response = await request.put<GetDetailDataResponse>(
        `/barang/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },

  async deleteBarang({ id }: { id: string }): Promise<GetDetailDataResponse> {
    try {
      const response = await request.delete<GetDetailDataResponse>(
        `/barang/${id}`
      );
      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },
};
