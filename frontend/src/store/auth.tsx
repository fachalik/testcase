/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";
import { useInfoViewStore } from "./infoView";
import { AuthAPI } from "@/service/auth";
import Cookies from "js-cookie";
import { setAuthToken } from "@/lib/request";
// import { useNavigate } from "react-router-dom";

interface AuthState {
  user: any | null;
  isNotAuthenticate: boolean;
}

interface AuthActions {
  signUpUser: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  signInUser: (data: { email: string; password: string }) => Promise<void>;
  getProfile: ({ access_token }: { access_token: string }) => Promise<void>;
  logout: () => void;
  getAuthUser: () => void;
  setIsNotAuthenticate: (isNotAuthenticate: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const initState: AuthState = {
  user: null,
  isNotAuthenticate: false,
};

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initState,

        setIsNotAuthenticate: (isNotAuthenticate: boolean) => {
          set({ isNotAuthenticate });
        },

        async getProfile({ access_token }: { access_token: string }) {
          const res = await AuthAPI.getProfile();
          const userData = res.data;

          await set({
            user: { ...userData, access_token },
          });
        },

        getAuthUser: () => {
          const token = localStorage.getItem("token");
          if (!token) {
            set({
              ...initState,
            });
            return;
          }

          setAuthToken(token);
        },

        signInUser: async ({
          email,
          password,
        }: {
          email: string;
          password: string;
        }) => {
          const { getProfile } = get();
          useInfoViewStore.getState().fetchStart();

          try {
            const user = await AuthAPI.login({ email, password });

            if (!user) {
              useInfoViewStore
                .getState()
                .fetchError("Invalid email or password");

              return;
            }

            await setAuthToken(user.data.access_token);

            await getProfile({ access_token: user.data.access_token });

            useInfoViewStore.getState().showMessage("Login Successfully");
            useInfoViewStore.getState().fetchSuccess();

            window.location.reload();
          } catch (error: any) {
            useInfoViewStore
              .getState()
              .fetchError(error.message || "Something went wrong");
            throw error;
          }
        },

        signUpUser: async ({
          name,
          email,
          password,
        }: {
          name: string;
          email: string;
          password: string;
        }): Promise<boolean> => {
          useInfoViewStore.getState().fetchStart();

          try {
            const data = await AuthAPI.register({
              email,
              name,
              password,
            });

            useInfoViewStore.getState().showMessage(data.message);
            useInfoViewStore.getState().fetchSuccess();
            return true;
          } catch (error: any) {
            console.log("error", error.message);
            useInfoViewStore
              .getState()
              .fetchError(error.message || "Something went wrong");
            return false;
          }
        },

        logout: async () => {
          // await timeout(800);
          localStorage.removeItem("token");
          localStorage.clear();
          Cookies.remove("refreshToken");
          setAuthToken();
          set({
            ...initState,
          });
          window.location.href = "/";
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;
