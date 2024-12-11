export function replaceText(template: string, country: string, service: string): string {
  return template
    .replace(/\{country\}/g, country)
    .replace(/\{service\}/g, service);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}