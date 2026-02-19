import { Routes, Route } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dasboard/DashboardPage";
import ProtectedRouter from "./components/ProtectedRouter";
import RegistrationPage from "./pages/registration/RegistrationPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="*" element={<ProtectedRouter />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
