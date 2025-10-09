// Init
window.addEventListener("hashchange", router);
if (!location.hash) location.hash = "#/";
document.getElementById("year").textContent = new Date().getFullYear();
applyTheme();
router();

// Build navbar links dynamically (depends on auth state)
function renderNavbar() {
  const nav = document.getElementById('navLinks');
  const common =
    `<a href="#/" class="navlink">Home</a>
     <a href="#/chat" class="navlink">Chat</a>
     <a href="#/profile" class="navlink">Profile</a>`;
  const auth =
    isLoggedIn()
      ? `<button id="logoutBtn" class="navlink">Logout</button>`
      : `<a href="#/login" class="navlink">Login</a>
         <a href="#/register" class="navlink">Register</a>`;
  nav.innerHTML = common + auth;
  const btn = document.getElementById('logoutBtn');
  if (btn) btn.onclick = () => { logoutSession(); location.hash = '#/login'; };
}

// Router
function router() {
  renderNavbar();
  const path = (location.hash.replace("#", "") || "/").split("?")[0];
  if      (path === "/")        renderLanding();
  else if (path === "/login")   renderLogin();
  else if (path === "/register")renderRegister();
  else if (path === "/chat")    renderChat();
  else if (path === "/profile") renderProfile();
  else                          renderLanding();
}

// Pages
function renderLanding() {
  $("#app").innerHTML = `
    <section class="grid md:grid-cols-2 items-center gap-8">
      <div>
        <h1 class="text-3xl font-bold">Connect your MUJ batch</h1>
        <p class="mt-2 text-zinc-600 dark:text-zinc-300">
          Batch-wise group chat • Clean responsive UI • Frontend-only demo.
        </p>
        <div class="mt-4 flex gap-2">
          <a href="#/register" class="rounded-xl bg-zinc-900 text-white px-4 py-2 dark:bg-zinc-100 dark:text-zinc-900">Get Started</a>
          <a href="#/chat" class="rounded-xl border px-4 py-2 dark:border-zinc-700">Open Chat</a>
        </div>
      </div>
      <div class="rounded-2xl border p-4 bg-gradient-to-br from-blue-500/20 to-fuchsia-500/20 text-center">
        <h2 class="font-semibold text-lg">MujConnects UI Demo</h2>
        <p class="text-sm text-zinc-700 dark:text-zinc-300">Mobile + Desktop • Tailwind</p>
      </div>
    </section>
  `;
}

function renderLogin() {
  $("#app").innerHTML = `
    <main class="mx-auto max-w-md">
      <div class="rounded-2xl border p-6 dark:border-zinc-800">
        <h2 class="text-xl font-bold mb-1">Welcome back</h2>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Login with your MUJ email.</p>
        <form id="loginForm" class="space-y-3">
          <label class="block text-sm"><span class="mb-1 block">Email</span>
            <input id="lemail" type="email" placeholder="yourid@muj.manipal.edu"
              required class="w-full rounded-xl border px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700" />
          </label>
          <label class="block text-sm"><span class="mb-1 block">Password</span>
            <input type="password" required class="w-full rounded-xl border px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700" />
          </label>
          <button class="w-full rounded-xl bg-zinc-900 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900">Login</button>
          <p class="text-center text-sm mt-1">No account? <a href="#/register" class="underline">Register</a></p>
        </form>
      </div>
    </main>
  `;
  $("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#lemail").value.trim();
    loginSession(email);
    const p = getProfile();
    if (!p.email) { p.email = email; setProfile(p); }
    location.hash = "#/home";
  });
}

function renderRegister() {
  $("#app").innerHTML = `
    <main class="mx-auto max-w-md">
      <div class="rounded-2xl border p-6 dark:border-zinc-800">
        <h2 class="text-xl font-bold mb-1">Create your account</h2>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Use your MUJ email to join your batch.</p>
        <form id="regForm" class="space-y-3">
          <label class="block text-sm"><span class="mb-1 block">Full Name</span>
            <input id="rname" required placeholder="Nazish Qarnain"
              class="w-full rounded-xl border px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700" />
          </label>
          <label class="block text-sm"><span class="mb-1 block">Email</span>
            <input id="remail" type="email" required placeholder="yourid@muj.manipal.edu"
              class="w-full rounded-xl border px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700" />
          </label>
          <label class="block text-sm"><span class="mb-1 block">Password</span>
            <input type="password" required class="w-full rounded-xl border px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700" />
          </label>
          <button class="w-full rounded-xl bg-zinc-900 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900">Register</button>
          <p class="text-center text-sm mt-1">Already have an account? <a href="#/login" class="underline">Login</a></p>
        </form>
      </div>
    </main>
  `;
  $("#regForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const p = getProfile();
    p.displayName = $("#rname").value || "Student";
    p.email = $("#remail").value || "";
    setProfile(p);
    loginSession(p.email);
    location.hash = "#/home";
  });
}

function renderHome() {
  const p = getProfile();
  const hasBatch = !!p.batchId;
  const grid = BATCHES.map(b => `
    <button ${hasBatch && p.batchId !== b.id ? 'disabled' : ''}
      data-batch="${b.id}"
      class="rounded-2xl border p-4 text-left transition hover:shadow-sm dark:border-zinc-700 ${p.batchId===b.id ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : ''}">
      <div class="font-semibold">${b.name}</div>
      <div class="text-xs text-zinc-600 dark:text-zinc-400">${p.batchId===b.id ? 'Joined' : 'Join'}</div>
    </button>`).join('');

  $("#app").innerHTML = `
    <div class="grid gap-6 md:grid-cols-3">
      <div class="md:col-span-2">
        <div class="rounded-2xl border p-5 dark:border-zinc-800">
          <h3 class="text-lg font-bold">Welcome, ${p.displayName || 'Student'}</h3>
          <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Select your batch to join the group chat.</p>
          <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">${grid}</div>
          <div class="mt-5 flex flex-wrap gap-2">
            <a href="#/chat" class="rounded-xl ${hasBatch?'bg-zinc-900 text-white hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900':'bg-zinc-300 text-zinc-600 cursor-not-allowed'} px-4 py-2">Go to Group Chat</a>
            <a href="#/profile" class="rounded-xl border px-4 py-2 dark:border-zinc-700">Edit Profile</a>
          </div>
        </div>
      </div>
      <div>
        <div class="rounded-2xl border p-5 dark:border-zinc-800">
          <h4 class="font-semibold">Your Profile</h4>
          <div class="mt-3 text-sm">${p.email || 'Not logged in'}</div>
          <div class="text-xs text-zinc-600 dark:text-zinc-400">${p.batchId || 'No batch joined'}</div>
        </div>
      </div>
    </div>
  `;
  document.querySelectorAll('[data-batch]').forEach(btn =>
    btn.addEventListener('click', () => { if (!hasBatch) { const pr = getProfile(); pr.batchId = btn.dataset.batch; setProfile(pr); renderHome(); }})
  );
}

function renderChat() {
  if (!isLoggedIn()) { location.hash = '#/login'; return; }
  const p = getProfile();
  const batchId = p.batchId || '2025-2026';
  $("#app").innerHTML = `
    <div class="flex items-center justify-between border-b pb-3 dark:border-zinc-800">
      <div><div class="text-sm text-zinc-500">Batch</div><h3 class="text-lg font-bold">${batchId}</h3></div>
    </div>
    <div id="chatBox" class="mt-3 h-[60vh] overflow-y-auto rounded-2xl border p-4 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div class="text-sm text-zinc-500">[System] Welcome to MujConnects 🎉</div>
    </div>
    <div class="mt-3 flex gap-2">
      <input id="msgInput" placeholder="Type a message…" class="flex-1 border rounded-xl px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700"/>
      <button id="sendBtn" class="rounded-xl bg-zinc-900 text-white px-4 py-2 dark:bg-zinc-100 dark:text-zinc-900">Send</button>
    </div>
  `;
  $("#sendBtn").onclick = () => {
    const val = $("#msgInput").value.trim();
    if (!val) return;
    const msg = document.createElement("div");
    msg.className = "mt-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-xl";
    msg.textContent = (p.displayName || "You") + ": " + val;
    $("#chatBox").appendChild(msg);
    $("#msgInput").value = "";
    $("#chatBox").scrollTop = $("#chatBox").scrollHeight;
  };
}

function renderProfile() {
  if (!isLoggedIn()) { location.hash = '#/login'; return; }
  const p = getProfile();
  $("#app").innerHTML = `
    <h2 class="text-xl font-bold mb-3">Your Profile</h2>
    <label class="block mb-2">Name:
      <input id="nameInput" value="${p.displayName}" class="w-full border rounded-xl px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700"/>
    </label>
    <label class="block mb-2">Email:
      <input id="emailInput" value="${p.email}" class="w-full border rounded-xl px-3 py-2 dark:bg-zinc-900 dark:border-zinc-700"/>
    </label>
    <button id="saveBtn" class="mt-2 rounded-xl bg-blue-600 text-white px-4 py-2">Save</button>
  `;
  $("#saveBtn").onclick = () => {
    p.displayName = $("#nameInput").value || p.displayName;
    p.email = $("#emailInput").value || p.email;
    setProfile(p);
    alert("Profile saved!");
  };
}
