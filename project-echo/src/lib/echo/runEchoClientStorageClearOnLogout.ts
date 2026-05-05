import { readEchoClientStorageKeysToClearOnLogout } from "@/lib/echo/readEchoClientStorageKeysToClearOnLogout";

export const runEchoClientStorageClearOnLogout = (): void => {
  if (typeof window === "undefined") {
    return;
  }
  const keys = readEchoClientStorageKeysToClearOnLogout();
  for (const key of keys) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("ECHO could not clear localStorage key on logout.", key, error);
    }
  }
  try {
    window.sessionStorage.clear();
  } catch (error) {
    console.error("ECHO could not clear sessionStorage on logout.", error);
  }
};
