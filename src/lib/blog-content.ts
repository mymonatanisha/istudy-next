import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "h2",
  "h3",
  "h4",
  "strong",
  "em",
  "u",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "a",
  "figure",
  "img",
  "figcaption",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel", "title"],
  img: [
    "src",
    "alt",
    "title",
    "loading",
    "width",
    "height",
    "data-cloudinary-public-id",
  ],
};

const ALLOWED_SCHEMES = ["http", "https", "mailto"];

/**
 * Sanitize HTML authored in the Blog Admin before it is stored or rendered.
 * This is intentionally a small allow-list for the blog's supported content.
 */
export function sanitizeBlogContent(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ALLOWED_SCHEMES,
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          ...(attribs.target === "_blank"
            ? { rel: "noopener noreferrer" }
            : {}),
        },
      }),
    },
  });
}
