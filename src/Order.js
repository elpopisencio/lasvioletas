import { useMemo } from "react";
import { Selector } from "./Selector";
import { money } from "./utils";

export const Order = ({ data, selection, setSelection, setFinished }) => {
  const total = useMemo(
    () =>
      Object.keys(selection).reduce(
        (total, current) =>
          total +
          Object.values(selection[current]).reduce(
            (total, { cost, amount }) => total + cost * amount,
            0
          ),
        0
      ),
    [selection]
  );
  return (
    <>
      <div className="columns" style={{ width: "90%" }}>
        {Object.keys(data).map((type) => (
          <Selector
            key={type}
            type={type}
            selection={selection}
            setSelection={setSelection}
            data={data}
          />
        ))}
      </div>
      <h3 className="title">Total: {money(total)}</h3>
      <button
        className="button"
        onClick={() => {
          if (!total) {
            return alert("No seleccionaste nada 😔");
          }
          setFinished(true);
        }}
      >
        Hacer pedido
      </button>
    </>
  );
};
