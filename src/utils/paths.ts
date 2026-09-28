export function withBase(path: string): string {
  const relativePath = path.replace(/^\/+/, '');
  const basePath = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${basePath}${relativePath}`;
}
