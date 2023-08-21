import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect } from "react";
import { getRawDate } from "../common";
import { FONTS } from "../constants";
import i18n from "../i18n";

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

  // change language to malayalam
  useEffect(() => {
    i18n.changeLanguage("ml");
  }, []);

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onDateChange(getRawDate(event.target.value));
    },
    [onDateChange]
  );

  const veggieChipStyle = (veggie: string) => css`
    margin: 1px;
    ${FONTS.STYLE_MALAYALAM_FONT_REGULAR}
    font-weight: 400;
    ${selectedVeggies.includes(veggie) ? "background-color: green" : ""}
  `;

  const offerValidTillContainerStyle = css`
    padding-top: 40px;
    font-size: 1em;
    ${FONTS.STYLE_MALAYALAM_FONT_MEDIUM}
  `;

  const datePickerStyle = css`
    padding: 5px 10px;
    margin-left: 20px;
    margin-bottom: 10px;
  `;

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
      <div css={offerValidTillContainerStyle}>
        <span>{t("Offer Valid Till")}: </span>
        <input
          css={datePickerStyle}
          type="date"
          value={
            validTillDate ? validTillDate?.toISOString().split("T")[0] : ""
          }
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};
