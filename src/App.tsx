import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { toPng } from "html-to-image";
import { VeggieSelector } from "./components/VeggieSelector";
import { PriceTable } from "./components/PriceTable";
import { GraphicPoster } from "./components/GraphicPoster";
import { COLORS, COUNTS, FONTS, NAMES, SIZES } from "./constants";
import { useTranslation } from "react-i18next";
import { getRawDate, randomVeggieEmoji } from "./common";
import i18n from "./i18n";
import "./App.css";

export interface PriceDetails {
  [name: string]: number;
}

function App() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVeggieEmoji, setCurrentVeggieEmoji] = useState(
    randomVeggieEmoji()
  );
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);
  const [priceDetails, setPriceDetails] = useState<PriceDetails>({});
  const [validTillDate, setValidTillDate] = useState<Date>(
    getRawDate(new Date().toISOString())
  );

  // change the veggie emoji shown on the spinner every 500ms
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentVeggieEmoji(randomVeggieEmoji());
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // load the data in the localStorage
  useEffect(() => {
    const storedVeggies = localStorage.getItem("selectedVeggies");
    const storedPrices = localStorage.getItem("priceDetails");

    if (storedVeggies) {
      setSelectedVeggies(JSON.parse(storedVeggies));
    }
    if (storedPrices) {
      setPriceDetails(JSON.parse(storedPrices));
    }
  }, []);

  // update localStorage
  useEffect(() => {
    localStorage.setItem("selectedVeggies", JSON.stringify(selectedVeggies));
  }, [selectedVeggies]);
  useEffect(() => {
    localStorage.setItem("priceDetails", JSON.stringify(priceDetails));
  }, [priceDetails]);

  // change language to malayalam
  useEffect(() => {
    i18n.changeLanguage("ml");
  }, []);

  const handleVeggieSelection = useCallback((veggie: string) => {
    setSelectedVeggies((prev) => {
      if (prev.includes(veggie)) {
        return prev.filter((v) => v !== veggie);
      } else if (prev.length < COUNTS.ITEM_COUNT_LIMIT) {
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
    setIsLoading(true);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        // Now capture the image using html-to-image
        if (!ref.current) {
          setIsLoading(false);
          return;
        }

        toPng(ref.current, {
          cacheBust: true,
          backgroundColor: COLORS.BODY_BACKGROUND_COLOR,
        })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = NAMES.EXPORT_POSTER_NAME;
            link.href = dataUrl;
            link.click();
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const isPosterGridValid = (filteredPriceDetails: PriceDetails) =>
    Object.values(filteredPriceDetails).filter((price) => price !== 0)
      .length === COUNTS.ITEM_COUNT_LIMIT;

  const filteredPriceDetails: PriceDetails = Object.keys(priceDetails)
    .filter((veggie) => selectedVeggies.includes(veggie))
    .reduce((obj, veggie) => {
      obj[veggie] = priceDetails[veggie];
      return obj;
    }, {} as PriceDetails);

  const containerStyle = css`
    display: flex;
    flex-direction: column;
    max-width: ${SIZES.POSTER_WIDTH};
  `;

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
    width: ${SIZES.POSTER_WIDTH};
  `;

  const spinnerContainerStyle = css`
    position: fixed;
    top: 38%;
    left: 38%;
    transform: translate(-50%, -50%);
    background-color: rgba(218, 247, 166, 0.9);
    border: 1px solid #ddd;
    border-radius: 20%;
    padding: 20px;
    width: 21vw;
    height: 12vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const generateButtonStyle = css`
    width: 350px;
    margin: auto;
    margin-bottom: 40px;
    font-size: 1.5em;
    ${FONTS.STYLE_MALAYALAM_FONT_MEDIUM}
    ${(isLoading || !isPosterGridValid(filteredPriceDetails)) &&
    `cursor: not-allowed; opacity: 0.6;`}
  `;

  return (
    <div css={containerStyle}>
      {isLoading && (
        <div css={spinnerContainerStyle}>
          <div className="spinner">{currentVeggieEmoji}</div>
        </div>
      )}
      <div
        css={css`
          ${FONTS.STYLE_MALAYALAM_FONT_REGULAR}
        `}
      >
        <span>
          {t("SelectNVeggiesPrompt", { count: COUNTS.ITEM_COUNT_LIMIT })}
        </span>
      </div>
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
        disabled={isLoading || !isPosterGridValid(filteredPriceDetails)}
        css={generateButtonStyle}
      >
        {t("Generate Poster")}
      </button>
      {isPosterGridValid(filteredPriceDetails) && (
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
