import type { IUser } from "../types/IUser";

//claves para localStorage son string
const USERS_KEY : string = "users";
const SESSION_KEY : string = "userData";

//users
// Obtengo el array de usuarios desde localStorage, si no hay nada devuelvo un array vacío
export function getUsers(): IUser[] {
    try {
        // devuelvo un array vacío si no hay nada o si el JSON es inválido
        return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as IUser[];
    } catch {
        // Si el JSON es inválido, limpio el localStorage para evitar futuros errores
        return [];
    }
}

export function saveUser(user: IUser): void {
    // Agrego el nuevo usuario al array existente y lo guardo de nuevo en localStorage
    const users = getUsers();
    users.push(user);
    // Guardo el array actualizado en localStorage
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

//busco un usuario por email y password, si no lo encuentro devuelvo undefined
export function findUser(email: string, password: string): IUser | undefined {
    // busco un usuario que coincida con el email y password proporcionados
    return getUsers().find(u => u.email === email && u.password === password);
}

//session

// Guardo los datos del usuario logueado en localStorage para mantener la sesión activa
export function setSession(user: IUser): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

// Obtengo los datos del usuario logueado de localStorage, si no hay sesión activa devuelvo null
export function getSession(): IUser | null {
    try {
        // Intento obtener los datos del usuario logueado
        const data = localStorage.getItem(SESSION_KEY);
        // Si hay datos, los parseo y los devuelvo como IUser, si no hay datos devuelvo null
        return data ? (JSON.parse(data) as IUser) : null;
    } catch {
        return null;
    }
}

export function clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
}