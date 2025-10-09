function renderLogin() {
  $("#app").innerHTML = `
  <div class="max-w-md mx-auto p-6 border rounded-2xl dark:border-zinc-800">
    <h2 class="text-xl font-bold mb-3">Login</h2>
    <form id="loginForm" class="space-y-3">
      <input id="email" type="email" placeholder="College Email" class="w-full border rounded-xl px-3 py-2" required />
      <input id="pass" type="password" placeholder="Password" class="w-full border rounded-xl px-3 py-2" required />
      <button class="w-full rounded-xl bg-blue-600 text-white py-2">Login</button>
      <p class="text-center text-sm text-zinc-500">No account? <a href="#register" class="underline">Register</a></p>
    </form>
  </div>
  `;
  $("#loginForm").onsubmit = (e) => {
    e.preventDefault();
    const email = $("#email").value;
    loginSession(email);
    const p = getProfile();
    if (!p.email) p.email = email;
    setProfile(p);
    location.hash = "home";
  };
}

function renderRegister() {
  $("#app").innerHTML = `
  <div class="max-w-md mx-auto p-6 border rounded-2xl dark:border-zinc-800">
    <h2 class="text-xl font-bold mb-3">Register</h2>
    <form id="regForm" class="space-y-3">
      <input id="name" placeholder="Full Name" class="w-full border rounded-xl px-3 py-2" required />
      <input id="email" type="email" placeholder="College Email" class="w-full border rounded-xl px-3 py-2" required />
      <input id="pass" type="password" placeholder="Password" class="w-full border rounded-xl px-3 py-2" required />
      <button class="w-full rounded-xl bg-blue-600 text-white py-2">Register</button>
      <p class="text-center text-sm text-zinc-500">Already have account? <a href="#login" class="underline">Login</a></p>
    </form>
  </div>
  `;
  $("#regForm").onsubmit = (e) => {
    e.preventDefault();
    const p = getProfile();
    p.displayName = $("#name").value;
    p.email = $("#email").value;
    setProfile(p);
    loginSession(p.email);
    location.hash = "home";
  };
}
