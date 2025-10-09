// Simple hash routing
window.addEventListener("hashchange", router);
if (!location.hash) location.hash = "#/";
document.getElementById("year").textContent = new Date().getFullYear();
router();

function router() {
  const hash = location.hash.replace("#", "") || "/";
  if (hash === "/") renderLanding();
  else if (hash === "/chat") renderChat();
  else if (hash === "/profile") renderProfile();
  else renderLanding();
}

function renderLanding() {
  $("#app").innerHTML = `
    <section class="grid md:grid-cols-2 items-center gap-8">
      <div>
        <h1 class="text-3xl font-bold">Welcome to MujConnects</h1>
        <p class="mt-2 text-zinc-600">A platform for MUJ students to connect with their batchmates.</p>
        <a href="#/chat" class="mt-4 inline-block rounded-xl bg-blue-600 text-white px-4 py-2">Try Demo Chat</a>
      </div>
      <div class="rounded-2xl border p-4 bg-gradient-to-br from-blue-500/20 to-fuchsia-500/20 text-center">
        <h2 class="font-semibold text-lg">Frontend Only Demo</h2>
        <p class="text-sm text-zinc-700">Responsive • Modern • Tailwind CSS</p>
      </div>
    </section>
  `;
}

function renderChat() {
  $("#app").innerHTML = `
    <h2 class="text-xl font-bold mb-3">Batch Chat Demo</h2>
    <div class="rounded-2xl border p-4 bg-white dark:bg-zinc-900 h-[60vh] overflow-y-auto" id="chatBox">
      <div class="text-sm text-zinc-500">[System] Welcome to MujConnects 🎉</div>
    </div>
    <div class="mt-3 flex gap-2">
      <input id="msgInput" placeholder="Type a message..." class="flex-1 border rounded-xl px-3 py-2 dark:bg-zinc-900" />
      <button id="sendBtn" class="rounded-xl bg-blue-600 text-white px-4 py-2">Send</button>
    </div>
  `;
  $("#sendBtn").onclick = () => {
    const val = $("#msgInput").value.trim();
    if (!val) return;
    const msg = document.createElement("div");
    msg.className = "mt-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-xl";
    msg.textContent = "You: " + val;
    $("#chatBox").appendChild(msg);
    $("#msgInput").value = "";
    $("#chatBox").scrollTop = $("#chatBox").scrollHeight;
  };
}

function renderProfile() {
  const p = getProfile();
  $("#app").innerHTML = `
    <h2 class="text-xl font-bold mb-3">Your Profile</h2>
    <label class="block mb-2">Name:
      <input id="nameInput" value="${p.displayName}" class="w-full border rounded-xl px-3 py-2 dark:bg-zinc-900" />
    </label>
    <label class="block mb-2">Email:
      <input id="emailInput" value="${p.email}" class="w-full border rounded-xl px-3 py-2 dark:bg-zinc-900" />
    </label>
    <button id="saveBtn" class="mt-2 rounded-xl bg-blue-600 text-white px-4 py-2">Save</button>
  `;
  $("#saveBtn").onclick = () => {
    p.displayName = $("#nameInput").value;
    p.email = $("#emailInput").value;
    setProfile(p);
    alert("Profile saved!");
  };
}
