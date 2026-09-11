// Pings the IndexNow API (Bing, Yandex, Seznam, Naver — not Google, which has
// no public "request indexing" endpoint) whenever pages are added or changed.
// Key file lives at /<key>.txt in public/, proving domain ownership.
//
// Usage: node scripts/submit-indexnow.mjs [url ...]
// With no args, submits every URL currently in the sitemap.

const HOST = "boss-tire.ca";
const KEY = "13c0877c6b9aed2b2dafe934aac0ee1f";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const argUrls = process.argv.slice(2);
  const urlList = argUrls.length ? argUrls : await urlsFromSitemap();

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow:`);
  urlList.forEach((u) => console.log(`  ${u}`));

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  console.log(`\nIndexNow response: ${res.status} ${res.statusText}`);
  if (res.status !== 200 && res.status !== 202) {
    console.log(await res.text());
    process.exitCode = 1;
  }
}

main();
