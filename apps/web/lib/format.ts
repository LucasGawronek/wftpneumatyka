export function specificationEntries(
  value?:
    | string
    | Record<string, string | number | boolean | null>
    | null,
) {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [label, ...rest] = line.split(":");
        const normalizedLabel = rest.length > 0 ? label.trim() : `Pozycja ${index + 1}`;
        const normalizedValue = rest.length > 0 ? rest.join(":").trim() : line;

        return [normalizedLabel, normalizedValue || normalizedLabel] as const;
      });
  }

  return Object.entries(value).map(([key, entry]) => [key, String(entry)] as const);
}
