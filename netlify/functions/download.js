const ebooks = require("../../src/_data/ebooks.json");

exports.handler = async (event) => {
  const slug = event.queryStringParameters?.ebook;

  if (!slug) {
    return {
      statusCode: 400,
      body: "Missing ebook parameter",
    };
  }

  const ebook = ebooks.find((e) => e.slug === slug);

  if (!ebook || !ebook.download_url) {
    return {
      statusCode: 404,
      body: "Ebook not found",
    };
  }

  return {
    statusCode: 302,
    headers: {
      Location: ebook.download_url,
      "Cache-Control": "no-store",
    },
  };
};
