import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function GuestAuth({ children }) {
    const { isAuthenticated, user } = useAuth();
    if (isAuthenticated) {
        if (user && user?.roleName == "Customer") {
            return <Navigate to="/" />;
        } else if (user && (user?.roleName == "Tarot Reader")) {
            return <Navigate to="/home-tarot-reader" />;
        } else if (user && (user?.roleName == "Admin")) {
            return <Navigate to="/home-admin" />;
        }
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}