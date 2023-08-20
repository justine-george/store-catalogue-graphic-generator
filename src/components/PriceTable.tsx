import { ChangeEvent, useEffect } from "react";
import { PriceDetails } from "../App";
import { css } from "@emotion/react";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

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

  useEffect(() => {
    // change language to malayalam
    i18n.changeLanguage("ml");
  }, []);

  const handlePriceChange =
    (veggie: string) => (event: ChangeEvent<HTMLInputElement>) => {
      let value = parseFloat(event.target.value);
      if (value < 0) value = 0;
      updatePrice(veggie, value.toString());
    };

  const tableHeaderStyles = css`
    background-color: #202020;
    color: #f5f5f5;
    padding: 10px;
    text-align: center;
  `;

  return (
    <table>
      <thead>
        <tr>
          <th css={tableHeaderStyles}>Vegetable</th>
          <th css={tableHeaderStyles}>Price</th>
        </tr>
      </thead>
      <tbody>
        {selectedVeggies.map((veggie) => (
          <tr key={veggie}>
            <td
              css={css`
                width: 200px;
                font-family: "NotoSansMalayalam Medium", sans-serif;
                font-weight: 500;
              `}
            >
              {t(veggie)}
            </td>
            <td>
              <input
                type="number"
                min={0}
                value={priceDetails[veggie] || ""}
                onChange={handlePriceChange(veggie)}
                placeholder={t("Price in INR")}
                css={css`
                  padding: 5px 10px;
                  text-align: right;
                  width: 200px;
                  border-radius: 0;
                  border: none;
                  font-family: "NotoSansMalayalam Regular", sans-serif;
                `}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
