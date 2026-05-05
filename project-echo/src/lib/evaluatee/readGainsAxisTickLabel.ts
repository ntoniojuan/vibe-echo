export const readGainsAxisTickLabel = (value: number): string => {
  const rounded = Math.round(value);
  const labels: Record<number, string> = {
    1: "S",
    2: "N",
    3: "I",
    4: "A",
    5: "G",
  };
  return labels[rounded] ?? String(value);
};
