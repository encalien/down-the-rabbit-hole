export function toSnakeCase(string): string {
  return string.toLowerCase().replaceAll(" ", "_");
}

export function toPascalCase(string): string {
  return string
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join("");
}

export function toCamelCase(string): string {
  string = toPascalCase(string);
  return string[0].toLowerCase() + string.slice(1);
}