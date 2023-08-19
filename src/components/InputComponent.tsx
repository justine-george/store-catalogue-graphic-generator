import { useState } from "react";

interface InputComponentProps {
  onAdd: Function;
}

export const InputComponent: React.FC<InputComponentProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price) {
      onAdd({ name: name, price: price });
      setName("");
      setPrice("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          console.log(e.target.value);
        }}
        placeholder="Vegetable Name"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          console.log(e.target.value);
        }}
        placeholder="Price"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};
