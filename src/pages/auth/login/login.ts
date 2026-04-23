import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";

const form     = document.getElementById("login-form")      as HTMLFormElement;
const errorMsg = document.getElementById("error-msg") as HTMLParagraphElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const email    = (document.getElementById("email")    as HTMLInputElement).value.trim();
  const password = (document.getElementById("password") as HTMLInputElement).value.trim();

  // Validación básica
  if (!email || !password) {
    mostrarError("Completá todos los campos.");
    return;
  }

  // Buscar usuario en localStorage
  const usersRaw = localStorage.getItem("users");
  const users: IUser[] = usersRaw ? JSON.parse(usersRaw) : [];

  const usuario = users.find(u => u.email === email && u.password === password);

  if (!usuario) {
    mostrarError("Email o contraseña incorrectos.");
    return;
  }
  // Guardar sesión
  localStorage.setItem("userData", JSON.stringify(usuario));

  // Redirigir según rol
  if (usuario.rol === "admin") {
    navigate("/src/pages/admin/home.html");
  } else {
    navigate("/src/pages/client/home.html");
  }
});

function mostrarError(msg: string): void {
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
}