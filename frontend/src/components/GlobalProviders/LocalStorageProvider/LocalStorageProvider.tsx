import { createContext, useContext } from "react";

interface LocalStorageContext {
  keys: () => string[];
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => boolean;
  removeItem: (key: string) => boolean;
}

const LocalStorageContext = createContext<LocalStorageContext>({
  keys: () => {
    throw new Error("keys function not in context.");
    return [];
  },
  getItem: () => {
    throw new Error("getItem function not in context.");
  },
  setItem: () => {
    throw new Error("setItem function not in context.");
    return false;
  },
  removeItem: () => {
    throw new Error("removeItem function not in context.");
    return false;
  },
});

export const useLocalStorage = () => useContext(LocalStorageContext);

const localStorage = window.localStorage;

const LocalStorageProvider = (props: any) => {
  const keys = (): string[] => {
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
      const value = localStorage.key(i);
      if (value != null) {
        result.push(value);
        console.log(value);
      }
    }
    return result;
  };

  const getItem = (key: string): string => localStorage.getItem(key) || "";

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    return true;
  };

  return (
    <LocalStorageContext.Provider
      value={{ keys, getItem, setItem, removeItem }}
    >
      {props.children}
    </LocalStorageContext.Provider>
  );
};
export default LocalStorageProvider;
