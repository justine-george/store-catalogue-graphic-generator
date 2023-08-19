import { useCallback, useRef, useState } from "react";
import { css } from "@emotion/react";
import { toPng } from "html-to-image";
import "./App.css";
import { InputComponent } from "./components/InputComponent";
import { DisplayComponent } from "./components/DisplayComponent";

export interface Veggie {
  name: string;
  price: number;
}

const presetVeggies = [
  "Carrots",
  "Broccoli",
  "Spinach",
  "Potatoes",
  "Tomatoes",
  "Cabbage",
  "Cucumber",
  "Eggplant",
  "Onions",
  "Peppers",
  "Squash",
  "Lettuce",
  "Peas",
  "Beets",
  "Kale",
  "Radish",
  //... more veggies if needed
];

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const [veggies, setVeggies] = useState<Veggie[]>([]);

  const addVeggie = ({ name, price }: Veggie) => {
    setVeggies([...veggies, { name, price }]);
  };

  const generateImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "vegetable-catalogue.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ref]);

  const displayContainerStyle = css`
    padding: 16px;
    margin: 16px;
  `;

  return (
    <div>
      <InputComponent onAdd={addVeggie} />
      <div ref={ref} css={displayContainerStyle}>
        <DisplayComponent veggies={veggies} />
      </div>
      <button onClick={generateImage}>Generate Image</button>
    </div>
  );
}

export default App;
