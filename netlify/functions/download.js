exports.handler = async (event) => {
  try {
    const slug = event.queryStringParameters?.ebook;

    if (!slug) {
      return { statusCode: 400, body: "Missing ebook parameter" };
    }

    const origin =
      event.headers.origin ||
      event.headers.referer?.split("/").slice(0, 3).join("/") ||
      "https://paradize.life";

    // 🔑 Fetch Eleventy-generated JSON (SAFE)
    const res = await fetch(`${origin}/_data/ebooks.json`);

    if (!res.ok) {
      throw new Error("Failed to load ebooks JSON");
    }

    const ebooks = await res.json();

    const match = ebooks.find((e) => e.slug === slug);

    if (!match || !match.download_url) {
      return { statusCode: 404, body: "Download not found" };
    }

    return {
      statusCode: 302,
      headers: {
        Location: match.download_url,
        "Cache-Control": "no-store",
      },
    };
  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
