import { checkAuth, logout } from "../../.././src/utils/auth";
import type { IUser } from "../../../src/types/IUser";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});


const usersListElement = document.getElementById("usersList") as HTMLUListElement;

const renderUsers = () => {
    const users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");

    // Limpio la lista antes de renderizar 
    usersListElement.innerHTML = "";

    users.forEach((user) => {
        const li = document.createElement("li");
        
        // agrego clase
        li.classList.add("admin-list__item");
        //creo lista con email y rol de cada usuario
        li.textContent = `${user.email} (${user.rol})`;
        usersListElement.appendChild(li);
    });
};

const initPage = () => {
    checkAuth("admin");
    renderUsers(); // Llamo a la función de renderizado
};

initPage();