function renderNavbar() {
  const nav = $("#navbar");
  if (!nav) return;
  const links = [
    ["Home", "#home"],
    ["Chat", "#chat"],
    ["Profile", "#profile"],
  ];
  nav.innerHTML =
    links
      .map((l) => `<a href="${l[1]}" class="navlink">${l[0]}</a>`)
      .join("") +
    (isLoggedIn()
      ? `<button id="logout" class="navlink">Logout</button>`
      : `<a href="#login" class="navlink">Login</a><a href="#register" class="navlink">Register</a>`);
  const logout = $("#logout");
  if (logout) logout.onclick = () => { logoutSession(); location.hash = "login"; };
}

function router() {
  renderNavbar();
  const page = location.hash.replace("#", "") || "home";
  if (page === "login") renderLogin();
  else if (page === "register") renderRegister();
  else if (page === "chat") renderChat();
  else renderHome();
}

window.addEventListener("hashchange", router);
window.onload = router;
$("#year").textContent = new Date().getFullYear();
