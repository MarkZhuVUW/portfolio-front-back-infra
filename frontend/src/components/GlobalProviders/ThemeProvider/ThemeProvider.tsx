import { useState, createContext, useContext } from "react";

import { localStorageKeys, useLocalStorage } from "../LocalStorageProvider";
import { DarkTheme, LightTheme } from "@frontend-ui/themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

export const MuiTheme = {
  Dark: "dark",
  Light: "light",
};

interface ThemeContext {
  theme: string;
  setMuiTheme: (theme: string) => void;
  toggleLightDarkTheme: () => void;
}

const ThemeContext = createContext<ThemeContext>({
  theme: MuiTheme.Light,

  setMuiTheme: (theme: string) => {
    console.warn(`setMuiTheme is not in context`);
  },
  toggleLightDarkTheme: () => {
    console.warn(`toggleLightDarkTheme is not in context`);
  },
});
export const useMuiTheme = () => useContext(ThemeContext);

const ThemeProvider = (props: any) => {
  const { getItem, setItem } = useLocalStorage();

  const [theme, setTheme] = useState(
    getItem(localStorageKeys.THEME) == JSON.stringify(MuiTheme.Dark)
      ? MuiTheme.Dark
      : MuiTheme.Light,
  );

  const setMuiTheme = (theme: string) => {
    setItem(localStorageKeys.THEME, theme);
    setTheme(theme);
  };

  const muiTheme = theme === MuiTheme.Dark ? DarkTheme : LightTheme;

  const toggleLightDarkTheme = () => {
    const toggledTheme =
      theme == MuiTheme.Dark ? MuiTheme.Light : MuiTheme.Dark;
    setItem(localStorageKeys.THEME, toggledTheme);
    setTheme(toggledTheme);
  };
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeContext.Provider
        value={{ theme, setMuiTheme, toggleLightDarkTheme }}
      >
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
