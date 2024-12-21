import { AuthProvider } from "./contexts/FirebaseAuthContext";
import { useRoutes } from "react-router-dom";
import routes from "./router/AppRoutes";
import Theme from "./theme/Theme";
import { SettingsProvider } from "./contexts/SettingsContext";

const App = () => {
  const content = useRoutes(routes);

  return (
    <>
    <SettingsProvider>
    <Theme>
      <AuthProvider>{content}</AuthProvider>
      </Theme>
      </SettingsProvider>
    </>
  );
};

export default App;
