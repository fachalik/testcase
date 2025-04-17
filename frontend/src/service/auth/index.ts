import request from "@/lib/request";
import { handleError } from "@/lib/service_handle_error";
import {
  GetProfileResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "./model";

const service = "AuthAPI";

export const AuthAPI = {
  async login(payload: SignInRequest): Promise<SignInResponse> {
    try {
      const response = await request.post<SignInResponse>(
        "/auth/login",
        payload
      );
      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },

  async register(payload: SignUpRequest) {
    try {
      const response = await request.post<SignInResponse>(
        "/auth/register",
        payload
      );
      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },

  async getProfile(): Promise<GetProfileResponse> {
    try {
      const response = await request.get<GetProfileResponse>("/auth/profile");

      return response.data;
    } catch (error) {
      return handleError({ service, error });
    }
  },
};
