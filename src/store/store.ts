import { create } from "zustand";
import ls from "../ls/ls";

export interface Store {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useStore = create<Store>((set) => {
  const accessToken = ls.get("accessToken") || "";
  const refreshToken = ls.get("refreshToken") || "";
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    setAccessToken: (accessToken: string) => {
      ls.set("accessToken", accessToken);
      set({ accessToken });
    },
    setRefreshToken: (refreshToken: string) => {
      ls.set("refreshToken", refreshToken);
      set({ refreshToken });
    },
  };
});

// accessToken: get("accessToken") || "",
// refreshToken: get("refreshToken") || "",
// setAccessToken: (accessToken: string) => set({ accessToken }),
// setRefreshToken: (refreshToken: string) => set({ refreshToken }),
