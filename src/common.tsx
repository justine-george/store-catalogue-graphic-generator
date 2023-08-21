export function getRawDate(value: string) {
  const rawDate = new Date(value);
  return new Date(
    rawDate.getUTCFullYear(),
    rawDate.getUTCMonth(),
    rawDate.getUTCDate()
  );
}

export function formatDateToDDMMYYYY(date?: Date): string {
  if (!date) return "";

  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();

  if (day.length < 2) day = "0" + day;
  if (month.length < 2) month = "0" + month;

  return `${day}-${month}-${year}`;
}

export function randomVeggieEmoji() {
  const veggies = ["🍅", "🍆", "🥔", "🥕", "🫑", "🥒", "🥜", "🍠"];
  const randomIndex = Math.floor(Math.random() * veggies.length);
  return veggies[randomIndex];
}
