/* ============================================================
   Heart Space Sanctuary: site settings
   These are the only values you normally need to edit.
   Giving links live directly in the pages: index.html, missions.html, donate.html.
   ============================================================ */
const SITE = {
  // Free form-to-email service (web3forms.com). Create a free access key for
  // theheartspacesanctuary@gmail.com and paste it here. Until then, forms open
  // the visitor's email app addressed to the email below.
  web3formsKey: "",

  contactEmail: "theheartspacesanctuary@gmail.com",
};

/* ---------- Mobile menu ---------- */
document.querySelectorAll(".menu-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const nav = document.getElementById(btn.getAttribute("aria-controls"));
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

/* ---------- Forms (contact + email signup) ---------- */
document.querySelectorAll("form[data-form]").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = form.querySelector(".form-status");
    const data = new FormData(form);
    if (data.get("botcheck")) return; // spam trap

    const subject = form.dataset.form === "signup"
      ? "New email signup: Heart Space Sanctuary website"
      : "New message: Heart Space Sanctuary website";

    if (!SITE.web3formsKey) {
      const lines = [];
      for (const [k, v] of data.entries()) if (k !== "botcheck" && v) lines.push(`${k}: ${v}`);
      window.location.href =
        `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
      return;
    }

    data.append("access_key", SITE.web3formsKey);
    data.append("subject", subject);
    data.append("from_name", "Heart Space Sanctuary website");
    status.textContent = "Sending…";
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        form.reset();
        status.textContent = form.dataset.form === "signup"
          ? "Thank you! You're on the list."
          : "Thank you! We look forward to connecting.";
      } else {
        throw new Error(json.message || "Send failed");
      }
    } catch (err) {
      status.innerHTML = `Something went wrong. Please email us at <a href="mailto:${SITE.contactEmail}">${SITE.contactEmail}</a>.`;
    }
  });
});
