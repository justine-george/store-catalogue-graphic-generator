import { ChangeEvent, useState } from "react";
import { PriceDetails } from "../App";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { FONTS } from "../constants";

interface PriceTableProps {
  selectedVeggies: string[];
  updatePrice: (veggie: string, price: string) => void;
  priceDetails: PriceDetails;
}

export const PriceTable: React.FC<PriceTableProps> = ({
  selectedVeggies,
  updatePrice,
  priceDetails,
}) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePriceChange =
    (veggie: string) => (event: ChangeEvent<HTMLInputElement>) => {
      let value = parseFloat(event.target.value);

      if (value < 1 || value > 999) {
        setErrorMessage(t("Value should be between 1 and 999"));
        return;
      } else {
        setErrorMessage(null);
      }

      if (value < 0) value = 0;
      updatePrice(veggie, value.toString());
    };

  const tableHeaderStyles = css`
    background-color: #202020;
    color: #f5f5f5;
    padding: 10px;
    text-align: center;
  `;

  const errorMessageContainerStyle = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ddd;
    padding: 20px;
    z-index: 1000; // ensure it appears on top
    ${FONTS.STYLE_MALAYALAM_FONT_MEDIUM}
  `;

  const closeButtonStyle = css`
    margin-left: 8px;
    background-color: white;
    border: 1px solid red;
    border-radius: 0%;
    padding: 6px 8px 9px;
  `;

  const tableHeaderStyle = css`
    font-size: 1.1rem;
    ${FONTS.STYLE_MALAYALAM_FONT_BOLD}
  `;

  const tableRowStyle = css`
    width: 200px;
    ${FONTS.STYLE_MALAYALAM_FONT_MEDIUM}
    font-weight: 500;
  `;

  const inputNumberStyle = css`
    padding: 5px 10px;
    text-align: right;
    width: 200px;
    border-radius: 0;
    border: none;
    ${FONTS.STYLE_MALAYALAM_FONT_REGULAR}
  `;

  return (
    <table>
      {errorMessage && (
        <div css={errorMessageContainerStyle}>
          {errorMessage}
          <button css={closeButtonStyle} onClick={() => setErrorMessage(null)}>
            ❌
          </button>
        </div>
      )}
      <thead>
        <tr css={tableHeaderStyle}>
          <th css={tableHeaderStyles}>{t("Vegetable")}</th>
          <th css={tableHeaderStyles}>{t("Price")}</th>
        </tr>
      </thead>
      <tbody>
        {selectedVeggies.map((veggie) => (
          <tr key={veggie}>
            <td css={tableRowStyle}>{t(veggie)}</td>
            <td>
              <input
                css={inputNumberStyle}
                type="number"
                min={0}
                max={999}
                pattern="^[1-9][0-9]{0,2}$"
                value={priceDetails[veggie] || ""}
                onChange={handlePriceChange(veggie)}
                placeholder={t("Price in INR")}
                title={t("Value should be between 1 and 999")}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
