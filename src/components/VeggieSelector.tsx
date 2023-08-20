import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useEffect } from "react";
import { getRawDate } from "../common";

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
  "Long Beans", // payar
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
  "Potato", // urulakizhang
  "Green Beans", // green beans
];

export const VeggieSelector: React.FC<VeggieSelectorProps> = ({
  onSelect,
  selectedVeggies,
  validTillDate,
  onDateChange,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    // change language to malayalam
    i18n.changeLanguage("ml");
  }, []);

  const veggieChipStyle = (veggie: string) => css`
    margin: 1px;
    font-family: "NotoSansMalayalam Regular", sans-serif;
    font-weight: 400;
    ${selectedVeggies.includes(veggie) ? "background-color: green" : ""}
  `;

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(getRawDate(event.target.value));
  };

  return (
    <div>
      {presetVeggies.map((veggie) => (
        <button
          key={veggie}
          onClick={() => onSelect(veggie)}
          css={veggieChipStyle(veggie)}
        >
          {t(veggie)}
        </button>
      ))}
      <div
        css={css`
          padding-top: 40px;
          font-size: 1em;
          font-family: "NotoSansMalayalam Medium", sans-serif;
        `}
      >
        <span>{t("Offer Valid Till")}: </span>
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
