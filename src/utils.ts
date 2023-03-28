export function toSnakeCase(string): string {
  return string.toLowerCase().replaceAll(" ", "_");
}