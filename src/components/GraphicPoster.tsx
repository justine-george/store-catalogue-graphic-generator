import { useState } from "react";
import { PriceDetails } from "../App";
import { VeggieImages } from "../assets/images";
import { css } from "@emotion/react";
import headerImageSrc from "../assets/images/header.png";
import offerImageSrc from "../assets/images/offer.png";
import { COLORS, SIZES } from "../constants";

interface GraphicPosterProps {
  catalogueData: PriceDetails;
  validTillDate?: Date;
}

type VeggieKey = keyof typeof VeggieImages;

export const GraphicPoster: React.FC<GraphicPosterProps> = ({
  catalogueData,
  validTillDate,
}) => {
  const [headerImage, setHeaderImage] = useState<string | null>(headerImageSrc);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to generate the image path for a given vegetable
  const getVeggieImagePath = (veggie: string): string | null => {
    const formattedVeggie: string = veggie
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ""); // remove spaces and convert to lowercase

    if (formattedVeggie in VeggieImages) {
      return VeggieImages[formattedVeggie as VeggieKey];
    }

    return null; // or return a default image if you have one
  };

  function formatDateToDDMMYYYY(date?: Date): string {
    if (!date) return "";

    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    return `${day}-${month}-${year}`;
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          position: relative;
          height: 250px;
        `}
      >
        {/* Store Logo */}
        <div
          css={css`
            padding: 10px;
            background: #181818;
            color: white;
            font-size: 2em;
            max-width: 300px;
            position: absolute;
            // margin: 10px;
            top: 0;
            left: 0;
          `}
        >
          <span>N. A. Stores</span>
        </div>

        {/* Image Upload */}
        {headerImage ? (
          <>
            <input
              type="file"
              id="headerImageInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="headerImageInput">
              <img
                src={headerImage}
                alt="Header"
                css={css`
                  width: ${SIZES.POSTER_WIDTH};
                  height: 250px;
                  object-fit: cover;
                  cursor: pointer;
                `}
              />
            </label>
          </>
        ) : (
          <input type="file" onChange={handleImageChange} />
        )}

        {/* Offer sticker */}
        <div
          css={css`
            padding: 10px;
            color: white;
            max-width: 250px;
            position: absolute;
            bottom: 0;
            left: 0;
            // margin: 10px;
          `}
        >
          <img
            src={offerImageSrc}
            alt="offer-sticker"
            css={css`
              width: 200px;
              height: auto;
              object-fit: contain;
            `}
          />
        </div>

        {/* Offer valid till */}
        <div
          css={css`
            padding: 10px;
            background: #181818;
            color: white;
            max-width: 250px;
            position: absolute;
            bottom: 0;
            right: 0;
            // margin: 10px;
          `}
        >
          <span>Offer Valid Till: </span>
          {formatDateToDDMMYYYY(validTillDate)}
        </div>
      </div>

      {/* Catalogue Data Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          background: COLORS.BODY_BACKGROUND_COLOR,
          padding: "20px",
        }}
      >
        {Object.entries(catalogueData).map(([veggie, price]) => (
          <div
            key={veggie}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Load image for the vegetable from assets */}
            <img
              src={getVeggieImagePath(veggie)!}
              alt={veggie}
              css={css`
                width: 100px;
                height: 100px;
                object-fit: contain;
              `}
            />
            <span
              css={css`
                font-size: 1em;
                font-weight: 600;
              `}
            >
              {veggie}: Rs. {price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
