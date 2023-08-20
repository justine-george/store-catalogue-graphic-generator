export function getRawDate(value: string) {
  const rawDate = new Date(value);
  return new Date(
    rawDate.getUTCFullYear(),
    rawDate.getUTCMonth(),
    rawDate.getUTCDate()
  );
}
