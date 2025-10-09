function renderChat() {
  const p = getProfile();
  if (!isLoggedIn()) return (location.hash = "login");
  const b = p.batchId || "2025-2026";
  $("#app").innerHTML = `
  <div class="border rounded-2xl p-4 dark:border-zinc-800">
    <h3 class="text-lg font-bold mb-3">Batch Chat (${b})</h3>
    <div id="chatBox" class="h-[60vh] overflow-y-auto border rounded-xl p-3 mb-2 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div class="text-sm text-zinc-500">[System] Welcome to MujConnects 🎉</div>
    </div>
    <div class="flex gap-2">
      <input id="msgInput" placeholder="Type a message..." class="flex-1 border rounded-xl px-3 py-2 dark:bg-zinc-900" />
      <button id="sendBtn" class="rounded-xl bg-blue-600 text-white px-4 py-2">Send</button>
    </div>
  </div>`;
  $("#sendBtn").onclick = () => {
    const val = $("#msgInput").value.trim();
    if (!val) return;
    const msg = document.createElement("div");
    msg.className =
      "mt-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-xl";
    msg.textContent = `${p.displayName}: ${val}`;
    $("#chatBox").appendChild(msg);
    $("#msgInput").value = "";
    $("#chatBox").scrollTop = $("#chatBox").scrollHeight;
  };
}
