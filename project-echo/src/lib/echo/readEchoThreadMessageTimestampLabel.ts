export const readEchoThreadMessageTimestampLabel = (createdAt: Date): string => {
  if (createdAt.getTime() === 0) {
    return "…";
  }
  return createdAt.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};
