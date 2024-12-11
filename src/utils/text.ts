export function replaceText(template: string, country: string, service: string): string {
  return template
    .replace(/\{country\}/g, country)
    .replace(/\{service\}/g, service);
}