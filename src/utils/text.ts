export function replaceText(
  template: string,
  replacements: Record<string, string>
): string {
  return Object.entries(replacements).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`\\[${key}\\]`, "g"), value);
  }, template);
}
