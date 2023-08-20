import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { toPng } from "html-to-image";
import { VeggieSelector } from "./components/VeggieSelector";
import { PriceTable } from "./components/PriceTable";
import "./App.css";
import { GraphicPoster } from "./components/GraphicPoster";
import { COLORS, SIZES } from "./constants";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
import { getRawDate } from "./common";

export interface PriceDetails {
  [name: string]: number;
}

function App() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);
  const [priceDetails, setPriceDetails] = useState<PriceDetails>({});
  const [validTillDate, setValidTillDate] = useState<Date>(
    getRawDate(new Date().toISOString())
  );

  const handleVeggieSelection = useCallback((veggie: string) => {
    setSelectedVeggies((prev) => {
      if (prev.includes(veggie)) {
        return prev.filter((v) => v !== veggie);
      } else if (prev.length < 12) {
        return [...prev, veggie];
      }
      return prev;
    });
  }, []);

  const updatePrice = useCallback((veggie: string, price: string) => {
    const priceValue = parseFloat(price);
    if (!isNaN(priceValue)) {
      setPriceDetails((prev) => ({
        ...prev,
        [veggie]: priceValue,
      }));
    } else {
      setPriceDetails((prev) => ({
        ...prev,
        [veggie]: 0,
      }));
    }
  }, []);

  const generateImage = useCallback(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        // Now capture the image using html-to-image
        if (!ref.current) return;

        toPng(ref.current, {
          cacheBust: true,
          backgroundColor: COLORS.BODY_BACKGROUND_COLOR,
        })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "vegetable-catalogue.png";
            link.href = dataUrl;
            link.click();
          })
          .catch(console.error);
      });
    }
  }, []);

  const veggieSelectorStyle = css`
    padding: 20px;
    margin: auto;
    width: 400px;
  `;

  const priceTableStyle = css`
    margin: auto;
    margin-bottom: 20px;
    padding: 16px;
    width: 400px;
  `;

  const graphicPosterStyle = css`
    margin-top: 20px;
    width: ${SIZES.POSTER_WIDTH};
  `;

  useEffect(() => {
    // change language to malayalam
    i18n.changeLanguage("ml");
  }, []);

  const filteredPriceDetails: PriceDetails = Object.keys(priceDetails)
    .filter((veggie) => selectedVeggies.includes(veggie))
    .reduce((obj, veggie) => {
      obj[veggie] = priceDetails[veggie];
      return obj;
    }, {} as PriceDetails);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        max-width: ${SIZES.POSTER_WIDTH};
      `}
    >
      <div css={veggieSelectorStyle}>
        <VeggieSelector
          onSelect={handleVeggieSelection}
          selectedVeggies={selectedVeggies}
          validTillDate={validTillDate}
          onDateChange={(date) => setValidTillDate(date)}
        />
      </div>
      {selectedVeggies.length > 0 && (
        <div css={priceTableStyle}>
          <PriceTable
            selectedVeggies={selectedVeggies}
            updatePrice={updatePrice}
            priceDetails={priceDetails}
          />
        </div>
      )}
      <button
        onClick={generateImage}
        css={css`
          width: 350px;
          margin: auto;
          margin-bottom: 40px;
          font-size: 1.5em;
          font-family: "NotoSansMalayalam Medium", sans-serif;
        `}
      >
        {t("Generate Poster")}
      </button>
      {Object.keys(filteredPriceDetails).length > 0 && (
        <div ref={ref} css={graphicPosterStyle}>
          <GraphicPoster
            catalogueData={filteredPriceDetails}
            validTillDate={validTillDate}
          />
        </div>
      )}
    </div>
  );
}

export default App;
