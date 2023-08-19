import { Veggie } from "../App";

interface DisplayComponentProps {
  veggies: Veggie[];
}

export const DisplayComponent: React.FC<DisplayComponentProps> = ({
  veggies,
}) => {
  return (
    <div id="catalogue">
      {veggies.map((veggie, index) => (
        <div key={index}>
          {veggie.name}: Rs. {veggie.price}
        </div>
      ))}
    </div>
  );
};
