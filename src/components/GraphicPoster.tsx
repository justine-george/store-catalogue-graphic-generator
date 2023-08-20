import { useEffect, useState } from "react";
import { PriceDetails } from "../App";
import { VeggieImages } from "../assets/images";
import { css } from "@emotion/react";
import headerImageSrc from "../assets/images/header.png";
import offerImageSrc from "../assets/images/offer3.png";
import { COLORS, SIZES } from "../constants";
import "../i18n";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface GraphicPosterProps {
  catalogueData: PriceDetails;
  validTillDate?: Date;
}

type VeggieKey = keyof typeof VeggieImages;

export const GraphicPoster: React.FC<GraphicPosterProps> = ({
  catalogueData,
  validTillDate,
}) => {
  const { t } = useTranslation();
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

  useEffect(() => {
    // change language to malayalam
    i18n.changeLanguage("ml");
  }, []);

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
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 10px 20px;
            background: #daf7a6;
            // color: white;
            font-size: 3rem;
            // max-width: 300px;
            position: absolute;
            // border: 1px solid green;
            border-radius: 20px;
            margin: 15px;
            margin-top: 10px;
            top: 0;
            left: 0;
          `}
        >
          <div
            css={css`
              font-size: 3.2rem;
              font-family: "NotoSansMalayalam Bold", sans-serif;
              height: 55px;
            `}
          >
            <span>{t("Nanthalath")}</span>
          </div>
          <div
            css={css`
              font-size: 2.8rem;
              font-family: "Overpass SemiBold", sans-serif;
              height: 55px;
            `}
          >
            <span>N. A. STORES</span>
          </div>
          <div
            css={css`
              font-size: 1.2rem;
              font-family: "Overpass SemiBold", sans-serif;
            `}
          >
            <span>CHAKKITTAPARA</span>
          </div>
          <div
            css={css`
              font-size: 1rem;
              font-family: "Overpass SemiBold", sans-serif;
            `}
          >
            <span>📱Phone : 9447633921</span>
          </div>
          {/* <div
            css={css`
              font-size: 1rem;
              font-family: "Overpass SemiBold", sans-serif;
            `}
          >
            <span>{t("Slogan")}</span>
          </div> */}
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
            padding-left: 10px;
            color: white;
            max-width: 250px;
            position: absolute;
            top: 0;
            right: 0;
            // margin: 10px;
          `}
        >
          <img
            src={offerImageSrc}
            alt="offer-sticker"
            css={css`
              width: 230px;
              height: auto;
              object-fit: contain;
            `}
          />
        </div>

        {/* Offer valid till */}
        {validTillDate && (
          <div
            css={css`
              padding: 10px;
              background: #181818;
              color: white;
              max-width: 250px;
              position: absolute;
              bottom: 0;
              right: 0;
              font-family: "NotoSansMalayalam Regular", sans-serif;
              border-radius: 8px;
              margin: 5px;
            `}
          >
            <span>{t("Offer Valid Till")}: </span>
            {formatDateToDDMMYYYY(validTillDate)}
          </div>
        )}
      </div>

      {/* Catalogue Data Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          background: COLORS.BODY_BACKGROUND_COLOR,
          padding: "10px",
        }}
      >
        {Object.entries(catalogueData).map(([veggie, price]) => (
          <div
            key={veggie}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "180px",
              // TODO: border or not?
              border: "1px solid grey",
              paddingBottom: "10px",
              borderRadius: "20px",
              position: "relative",
            }}
          >
            {/* Load image for the vegetable from assets */}
            <img
              src={getVeggieImagePath(veggie)!}
              alt={veggie}
              css={css`
                width: 160px;
                height: 160px;
                object-fit: contain;
              `}
            />
            <div
              css={css`
                display: flex;
                width: 100%;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                font-size: 1.1em;
                font-family: "NotoSansMalayalam Medium", sans-serif;
                font-weight: 500;
              `}
            >
              <div
                css={css`
                  font-size: 1em;
                  font-family: "NotoSansMalayalam Medium", sans-serif;
                  font-weight: 500;
                  margin-right: 8px;
                  position: absolute;
                  bottom: 5px;
                  left: 10px;
                `}
              >
                {t(veggie)}
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 2.3em;
                  font-family: "NotoSansMalayalam Medium", sans-serif;
                  font-weight: 500;
                  position: absolute;
                  bottom: 2px;
                  right: 2px;

                  background-color: #d22b2b;
                  color: white;
                  max-width: 80px;
                  padding: 7px 10px 0px 10px;
                  border-radius: 30%;
                `}
              >
                <span>{price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
