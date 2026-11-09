// Сайт (папка public) + приймач заявок /api/lead, що надсилає їх у Telegram.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/lead") {
      if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
      let d;
      try { d = await request.json(); } catch (e) { return new Response("Bad JSON", { status: 400 }); }
      if (d.hp) return new Response("ok"); // захист від ботів
      const text = String(d.text || "").slice(0, 1500);
      if (text.length < 10) return new Response("Empty", { status: 400 });
      if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return new Response("Not configured", { status: 500 });
      const r = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: "🚚 Нова заявка\n\n" + text })
      });
      return new Response(r.ok ? "ok" : "Telegram error", { status: r.ok ? 200 : 502 });
    }
    return env.ASSETS.fetch(request);
  }
};
