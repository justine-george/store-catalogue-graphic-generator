import { ChangeEvent } from "react";
import { PriceDetails } from "../App";
import { css } from "@emotion/react";

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
  const handlePriceChange =
    (veggie: string) => (event: ChangeEvent<HTMLInputElement>) => {
      updatePrice(veggie, event.target.value);
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
              `}
            >
              {veggie}
            </td>
            <td>
              <input
                type="number"
                value={priceDetails[veggie] || ""}
                onChange={handlePriceChange(veggie)}
                placeholder="Price in INR"
                css={css`
                  padding: 5px 10px;
                  text-align: right;
                  width: 200px;
                `}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
