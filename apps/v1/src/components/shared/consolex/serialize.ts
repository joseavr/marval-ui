export function preview(value: unknown): string {
  if (value instanceof File) {
    return `File(${value.name}, ${value.type || "unknown"}, ${value.size}b)`;
  }

  if (value instanceof Blob) {
    return `Blob(${value.type}, ${value.size}b)`;
  }

  if (value instanceof Date) {
    return `Date(${value.toISOString()})`;
  }

  if (Array.isArray(value)) {
    return `Array(${value.length})`;
  }

  if (typeof value === "object" && value !== null) {
    return `Object(${Object.keys(value).length})`;
  }

  return String(value);
}
