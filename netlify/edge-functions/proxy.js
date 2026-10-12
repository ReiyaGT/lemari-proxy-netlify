export default async (request, context) => {
  const url = new URL(request.url);
  const targetUrl = "https://avatar.roblox.com" + url.pathname + url.search;

  const modifiedHeaders = new Headers();
  modifiedHeaders.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
  modifiedHeaders.set("Accept", "application/json, text/plain, */*");
  modifiedHeaders.set("Accept-Language", "en-US,en;q=0.9");

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: modifiedHeaders,
    });

    const body = await response.text();
    return new Response(body, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
