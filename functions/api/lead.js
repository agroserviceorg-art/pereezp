// Приймає заявку з сайту і надсилає її в Telegram. Адреса: /api/lead
export async function onRequestPost({ request, env }) {
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
