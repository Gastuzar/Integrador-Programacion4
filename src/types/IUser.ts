import type { Rol } from "./Rol";

export interface IUser {
    id: number;
    email: string;
    loggedIn: boolean | null;
    password: string;
    rol: Rol;
}