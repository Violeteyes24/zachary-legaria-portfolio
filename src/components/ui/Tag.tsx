/** A pill-shaped tech / meta tag. */
export function Tag({ children }: { children: string }) {
  return <span className="chip">{children}</span>;
}

/** Renders a list of strings as a wrapping row of tags. */
export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}
