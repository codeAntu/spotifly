import { create } from "zustand";
import ls from "../ls/ls";

export interface Store {
  accessToken: string;
  refreshToken: string;
  expired_at: Date;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setExpired_at: (expired_at: Date) => void;
}

export const useStore = create<Store>((set) => {
  const accessToken = ls.get("accessToken") || "";
  const refreshToken = ls.get("refreshToken") || "";
  const expired_at = ls.get("expired_at")
    ? new Date(ls.get("expired_at")!)
    : new Date(new Date().getTime() - 3600 * 1000);
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    expired_at: expired_at,
    setAccessToken: (accessToken: string) => {
      ls.set("accessToken", accessToken);
      set({ accessToken });
    },
    setRefreshToken: (refreshToken: string) => {
      ls.set("refreshToken", refreshToken);
      set({ refreshToken });
    },
    setExpired_at: (expired_at: Date) => {
      ls.set("expired_at", expired_at.toISOString());
      set({ expired_at });
    },
  };
});

// accessToken: get("accessToken") || "",
// refreshToken: get("refreshToken") || "",
// setAccessToken: (accessToken: string) => set({ accessToken }),
// setRefreshToken: (refreshToken: string) => set({ refreshToken }),
