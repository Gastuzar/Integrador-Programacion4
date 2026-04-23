import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { navigate } from "./navigate";

// Función para verificar la autenticación y autorización del usuario
export function checkAuth(rolRequerido: Rol): void {
    
    // Obtengo los datos del usuario logueado de localStorage
    const userDataRaw = localStorage.getItem("userData");

    // Si no hay sesión, mandamos al login
    if (!userDataRaw) {
        navigate("/src/pages/auth/login/login.html");
        return;
    }

    // Si hay sesión, verificamos el rol
    const userData: IUser = JSON.parse(userDataRaw);

    // Si el rol no coincide, redirigimos
    if (userData.rol !== rolRequerido) {
        alert("No tenés permisos para acceder a esta sección");
        navigate("/src/pages/auth/login/login.html");
    }
}

// Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem("userData");
    navigate("/src/pages/auth/login/login.html");
}