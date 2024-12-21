import { activeLayoutThemeSettings } from "../layouts/activeLayoutThemeSettings";
import { createContext, useState } from "react";
import merge from "lodash/merge";

const SettingsContext = createContext({
  updateSettings: () => {},
  settings: activeLayoutThemeSettings,
});

export const SettingsProvider = ({ settings, children }) => {
  const [currentSettings, setCurrentSetting] = useState(
    settings || activeLayoutThemeSettings
  );

  const handleUpdateSettings = (update = {}) => {
    const merged = merge({}, currentSettings, update); // Deep merge using lodash
    setCurrentSetting(merged);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleUpdateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
