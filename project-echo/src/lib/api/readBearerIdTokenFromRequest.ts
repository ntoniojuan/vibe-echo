export const readBearerIdTokenFromRequest = (request: Request): string | null => {
  const header = request.headers.get("authorization")?.trim() ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  const token = match?.[1]?.trim();
  return token && token.length > 0 ? token : null;
};
