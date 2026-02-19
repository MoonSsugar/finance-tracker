import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";

export default function ProtectedRouter() {
  const token = useAppSelector((state) => state.auth.token);

  return token ? <Outlet /> : <Navigate to="/login" />;
}
