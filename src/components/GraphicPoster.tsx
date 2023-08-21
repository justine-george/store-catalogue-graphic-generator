import { useEffect, useState } from "react";
import { PriceDetails } from "../App";
import { VeggieImages } from "../assets/images";
import { formatDateToDDMMYYYY } from "../common";
import { COLORS, FONTS, SIZES } from "../constants";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/react";
import headerImageSrc from "../assets/images/header.png";
import offerImageSrc from "../assets/images/offer3.png";
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

  // change language to malayalam
  useEffect(() => {
    i18n.changeLanguage("ml");
  }, []);

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
      .replace(/\s+/g, ""); // remove spaces

    if (formattedVeggie in VeggieImages) {
      return VeggieImages[formattedVeggie as VeggieKey];
    }

    return null;
  };

  const containerStyle = css`
    display: flex;
    flex-direction: column;
  `;

  const headerContainerStyle = css`
    position: relative;
    height: 250px;
  `;

  const headerImageUploadInputStyle = css`
    display: none;
  `;

  const headerImageStyle = css`
    width: ${SIZES.POSTER_WIDTH};
    height: 250px;
    object-fit: cover;
    cursor: pointer;
  `;

  const storeLogoContainerStyle = css`
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
  `;

  const storeLogoLine1Style = css`
    font-size: 3.2rem;
    ${FONTS.STYLE_MALAYALAM_FONT_BOLD}
    height: 55px;
  `;

  const storeLogoLine2Style = css`
    font-size: 2.8rem;
    ${FONTS.STYLE_HEADER_FONT_SEMIBOLD}
    height: 55px;
  `;

  const storeLogoLocationStyle = css`
    font-size: 1.2rem;
    ${FONTS.STYLE_HEADER_FONT_SEMIBOLD}
  `;

  const storeLogoContactDetailsStyle = css`
    font-size: 1rem;
    ${FONTS.STYLE_HEADER_FONT_SEMIBOLD}
  `;

  const offerStickerContainerStyle = css`
    padding-left: 10px;
    color: white;
    max-width: 250px;
    position: absolute;
    top: 0;
    right: 0;
  `;

  const offerStickerImageStyle = css`
    width: 230px;
    height: auto;
    object-fit: contain;
  `;

  const offerValidTillStyle = css`
    padding: 10px;
    background: #181818;
    color: white;
    max-width: 250px;
    position: absolute;
    bottom: 0;
    right: 0;
    ${FONTS.STYLE_MALAYALAM_FONT_REGULAR}
    border-radius: 8px;
    margin: 5px;
  `;

  const gridContainerStyle = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    background: ${COLORS.BODY_BACKGROUND_COLOR};
    padding: 10px;
  `;

  const gridItemStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    border: 1px solid grey;
    padding-bottom: 10px;
    border-radius: 20px;
    position: relative;
  `;

  const gridImageStyle = css`
    width: 160px;
    height: 160px;
    object-fit: contain;
  `;

  const gridBottomRowContainerStyle = css`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    ${FONTS.STYLE_MALAYALAM_FONT_MEDIUM}
    font-weight: 500;
  `;

  const gridItemNameStyle = css`
    font-size: 1em;
    ${FONTS.STYLE_MALAYALAM_FONT_MEDIUM}
    font-weight: 500;
    margin-right: 8px;
    position: absolute;
    bottom: 5px;
    left: 10px;
  `;

  const gridItemPriceStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.3em;
    ${FONTS.STYLE_MALAYALAM_FONT_MEDIUM}
    font-weight: 500;
    position: absolute;
    bottom: 2px;
    right: 2px;

    background-color: #d22b2b;
    color: white;
    max-width: 80px;
    padding: 7px 10px 0px 10px;
    border-radius: 30%;
  `;

  return (
    <div css={containerStyle}>
      <div css={headerContainerStyle}>
        {/* Store Logo */}
        <div css={storeLogoContainerStyle}>
          <div css={storeLogoLine1Style}>
            <span>{t("Nanthalath")}</span>
          </div>
          <div css={storeLogoLine2Style}>
            <span>N. A. STORES</span>
          </div>
          <div css={storeLogoLocationStyle}>
            <span>CHAKKITTAPARA</span>
          </div>
          <div css={storeLogoContactDetailsStyle}>
            <span>📱Phone : 9447633921</span>
          </div>
        </div>

        {/* Header image with optional upload and replace */}
        {headerImage ? (
          <>
            <input
              css={headerImageUploadInputStyle}
              type="file"
              id="headerImageInput"
              onChange={handleImageChange}
            />
            <label htmlFor="headerImageInput">
              <img src={headerImage} alt="Header" css={headerImageStyle} />
            </label>
          </>
        ) : (
          <input type="file" onChange={handleImageChange} />
        )}

        {/* Offer sticker */}
        <div css={offerStickerContainerStyle}>
          <img
            css={offerStickerImageStyle}
            src={offerImageSrc}
            alt="offer-sticker"
          />
        </div>

        {/* Offer valid till */}
        {validTillDate && (
          <div css={offerValidTillStyle}>
            <span>{t("Offer Valid Till")}: </span>
            {formatDateToDDMMYYYY(validTillDate)}
          </div>
        )}
      </div>

      {/* Catalogue Grid */}
      <div css={gridContainerStyle}>
        {Object.entries(catalogueData).map(([veggie, price]) => (
          <div key={veggie} css={gridItemStyle}>
            <img
              css={gridImageStyle}
              src={getVeggieImagePath(veggie)!}
              alt={veggie}
            />
            <div css={gridBottomRowContainerStyle}>
              <div css={gridItemNameStyle}>{t(veggie)}</div>
              <div css={gridItemPriceStyle}>
                <span>{price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
