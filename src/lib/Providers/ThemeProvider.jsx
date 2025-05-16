import { ConfigProvider } from "antd";
import { mainTheme } from "../../utils/antTheme";

/**
 * ThemeProvider component wraps the application with a global theme.
 * The `ConfigProvider` is used to apply Ant Design's theme to all components.
 */
const ThemeProvider = ({ children }) => {
  return <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
