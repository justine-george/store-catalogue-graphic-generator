import { css } from "@emotion/react";

interface VeggieSelectorProps {
  onSelect: (veggie: string) => void;
  selectedVeggies: string[];
  validTillDate?: Date;
  onDateChange: (date: Date) => void;
}

const presetVeggies = [
  "Tomato", // thakali
  "Indian Cucumber", // vellari
  "Pumpkin", // mathan
  "Wax Gourd", // ilavan
  "Green Cucumber", // kakkiri
  "Eggplant", // vazhuthina
  "Cabbage", // cabbage
  "Drumstick", // muringa
  "Snake Gourd", // padavalam
  "Ladies Finger", // venda
  "Beans", // payar
  "Cauliflower", // cauliflower
  "Onion", // savola
  "Sweet Potato", // madura kizhang
  "Bottle Gourd", // churanga
  "Green Mango", // pachamanga
  "Cluster Beans", // kothamara
  "Ivy Gourd", // kovakka
  "Yellow Lemon", // cherunaranga
  "Beetroot", // beetroot
  "Carrot", // carrot
  "Apple", // apple
];

export const VeggieSelector: React.FC<VeggieSelectorProps> = ({
  onSelect,
  selectedVeggies,
  validTillDate,
  onDateChange,
}) => {
  const veggieChipStyle = (veggie: string) => css`
    margin: 1px;
    ${selectedVeggies.includes(veggie) ? "background-color: green" : ""}
  `;

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawDate = new Date(event.target.value);
    const adjustedDate = new Date(
      rawDate.getUTCFullYear(),
      rawDate.getUTCMonth(),
      rawDate.getUTCDate()
    );
    onDateChange(adjustedDate);
  };

  return (
    <div>
      {presetVeggies.map((veggie) => (
        <button
          key={veggie}
          onClick={() => onSelect(veggie)}
          css={veggieChipStyle(veggie)}
        >
          {veggie}
        </button>
      ))}
      <div
        css={css`
          padding-top: 40px;
        `}
      >
        <span>Offer Valid Till: </span>
        <input
          type="date"
          value={
            validTillDate ? validTillDate?.toISOString().split("T")[0] : ""
          }
          onChange={handleDateChange}
          css={css`
            padding: 5px 10px;
            margin-left: 20px;
            margin-bottom: 10px;
          `}
        />
      </div>
    </div>
  );
};
