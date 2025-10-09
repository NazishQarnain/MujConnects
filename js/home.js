function renderHome() {
  const p = getProfile();
  $("#app").innerHTML = `
  <div class="p-6 border rounded-2xl dark:border-zinc-800">
    <h2 class="text-xl font-bold">Welcome, ${p.displayName}</h2>
    <p class="text-sm text-zinc-500 mb-4">Select your batch to enter group chat:</p>
    <div class="grid sm:grid-cols-3 gap-3 mb-4">
      ${BATCHES.map(
        (b) => `
        <button data-batch="${b}" class="rounded-xl border px-3 py-2 ${
          p.batchId === b
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            : ""
        }">${b}</button>`
      ).join("")}
    </div>
    <button id="goChat" class="rounded-xl bg-blue-600 text-white px-4 py-2">Go to Chat</button>
  </div>`;
  document.querySelectorAll("[data-batch]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const pr = getProfile();
      pr.batchId = btn.dataset.batch;
      setProfile(pr);
      renderHome();
    })
  );
  $("#goChat").onclick = () => (location.hash = "chat");
}
