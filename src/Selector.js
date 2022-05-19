import { useState } from "react";
import { capitalize, money } from "./utils";

export const Selector = ({ type, selection, setSelection, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="column">
      <a
        className="title"
        onClick={() => {
          setOpen(!open);
        }}
        href="#!"
      >
        <span className="icon" style={{ marginRight: "10px" }}>
          <i className={`fas fa-${open ? "chevron-up" : "chevron-down"}`}></i>
        </span>
        {capitalize(type)}
      </a>
      {open &&
        data[type].map(({ name, cost }) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <button
              className="button is-small"
              onClick={() => {
                const newSelection = JSON.parse(JSON.stringify(selection));

                newSelection[type][name].amount =
                  selection[type][name].amount + 1;

                setSelection(newSelection);
              }}
            >
              <span className="icon is-small">
                <i className="fas fa-plus"></i>
              </span>
            </button>
            <button
              className="button is-small"
              style={{ marginRight: "5px" }}
              disabled={
                !selection[type][name] || selection[type][name].amount === 0
              }
              onClick={() => {
                const newSelection = JSON.parse(JSON.stringify(selection));

                newSelection[type][name].amount =
                  selection[type][name].amount - 1;

                setSelection(newSelection);
              }}
            >
              <span className="icon is-small">
                <i className="fas fa-minus"></i>
              </span>
            </button>
            <a
              href="#!"
              style={{ color: "inherit" }}
              onClick={() => {
                const newSelection = JSON.parse(JSON.stringify(selection));

                newSelection[type][name].amount =
                  selection[type][name].amount + 1;

                setSelection(newSelection);
              }}
            >
              <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                {name}
              </span>{" "}
              ({money(cost)})
            </a>
          </div>
        ))}
      <br />
      {Object.values(selection[type]).map(({ name, cost, amount }) =>
        amount ? (
          <div key={name}>
            {amount} de {name} = {money(cost * amount)}
          </div>
        ) : null
      )}
      <b>
        Total {capitalize(type)}:{" "}
        {money(
          Object.values(selection[type]).reduce(
            (total, { cost, amount }) => total + cost * amount,
            0
          )
        )}
      </b>
    </div>
  );
};
