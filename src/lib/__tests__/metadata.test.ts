import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { POSTS } from "@/lib/posts";

function pageFiles(dir = "src/app"): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...pageFiles(full));
    else if (e.name === "page.tsx") out.push(full);
  }
  return out;
}

function dupes(values: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const v of values) (seen.has(v) ? dup : seen).add(v);
  return [...dup];
}

// Every page declares its metadata via `buildMetadata({ title: ..., description: ... })`.
// Several pages (e.g. src/app/tires/page.tsx, src/app/tires/used-tires/page.tsx) also
// declare unrelated `title:` fields earlier in the file for card/FAQ data. A file-wide
// regex would match one of those first and silently substitute it for the real page
// title, so extraction is scoped to the buildMetadata({...}) call body specifically.
function metadataCallBody(file: string, contents: string): string {
  const call = contents.match(/buildMetadata\(\{([\s\S]*?)\}\)/);
  if (!call) {
    throw new Error(`${file}: no buildMetadata({...}) call found — cannot verify its metadata`);
  }
  return call[1];
}

// Blog post pages pull title/description off the POSTS registry
// (`title: post.title`) instead of declaring a string literal, so a naive
// `/title:\s*"([^"]+)"/` scan returns undefined for all five of them. A
// `.filter(Boolean)` over that would silently check 15 pages instead of 20 and
// still report green. Resolve those through the registry instead: any page
// whose title/description can't be determined throws rather than being
// dropped, so a silent skip is structurally impossible.
function resolveField(
  file: string,
  block: string,
  contents: string,
  field: "title" | "description"
): string {
  const literalPattern = field === "title" ? /title:\s*"([^"]+)"/ : /description:\s*\n?\s*"([^"]+)"/;
  const literal = block.match(literalPattern);
  if (literal) return literal[1];

  const registryPattern = new RegExp(`${field}:\\s*post\\.${field}\\b`);
  if (registryPattern.test(block)) {
    const slugMatch = contents.match(/getPost\("([^"]+)"\)/);
    if (!slugMatch) {
      throw new Error(`${file}: uses post.${field} but no getPost("...") call was found to resolve the slug`);
    }
    const post = POSTS.find((p) => p.slug === slugMatch[1]);
    if (!post) {
      throw new Error(`${file}: getPost("${slugMatch[1]}") does not match any entry in POSTS`);
    }
    return post[field];
  }

  throw new Error(
    `${file}: could not resolve ${field} inside its buildMetadata({...}) call ` +
      `(checked string literal and post.${field} registry reference)`
  );
}

describe("page metadata", () => {
  const files = pageFiles();

  // Pins the surface area this suite covers (9 pre-existing + 5 service pages
  // + 5 blog posts + 1 blog index = 20). If a page is added or removed without
  // this number changing too, that is a signal to look, not a reason to pass.
  it("finds all 20 page routes", () => {
    expect(files.length).toBe(20);
  });

  it("gives every page a unique title", () => {
    const titles = files.map((f) => {
      const contents = readFileSync(f, "utf8");
      return resolveField(f, metadataCallBody(f, contents), contents, "title");
    });
    // Guards against a future rewrite reintroducing a `.filter(Boolean)`-style
    // silent skip: every file examined must have produced exactly one title.
    expect(titles.length).toBe(files.length);
    expect(dupes(titles)).toEqual([]);
  });

  it("gives every page a unique description", () => {
    const descs = files.map((f) => {
      const contents = readFileSync(f, "utf8");
      return resolveField(f, metadataCallBody(f, contents), contents, "description");
    });
    expect(descs.length).toBe(files.length);
    expect(dupes(descs)).toEqual([]);
  });
});
