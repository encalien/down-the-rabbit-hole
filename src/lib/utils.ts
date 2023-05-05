export function toSnakeCase(string: string): string {
  return string.toLowerCase().replaceAll(" ", "_");
}

export function toPascalCase(string: string): string {
  return string
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join("");
}

export function toCamelCase(string: string): string {
  string = toPascalCase(string);
  return string[0].toLowerCase() + string.slice(1);
}

export function randomize(list: Array<any>): Array<any> {
  return list.sort(() => Math.random() - 0.5);
}

export function getNextId(list: Array<any>): number {
  return list.length ? list.sort((a, b) => b.id - a.id)[0].id + 1 : 0;
}

export function generateRandomNumber(multiplier?: number, usedNumbers?: number[]): number {
  const randomNumber = Math.floor(Math.random() * (multiplier || 1));
  if (!usedNumbers || !usedNumbers.includes(randomNumber)) return randomNumber;
  return generateRandomNumber(multiplier, usedNumbers);
}
