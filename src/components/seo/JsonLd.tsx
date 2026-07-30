/**
 * Renders a JSON-LD structured-data block. The content is our own trusted data
 * (built from src/data/portfolio.ts), so serializing it into a script tag is the
 * standard, safe way to expose schema.org markup to search engines.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
