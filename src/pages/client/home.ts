import { checkAuth, logout } from "../../../src/utils/auth";

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});


const initPage = () => {
  //usuario actual para saber quién es
  const currentUser = JSON.parse(localStorage.getItem("userData") || "null");

  if (!currentUser) {
      logout();
      return;
  }
};
initPage();