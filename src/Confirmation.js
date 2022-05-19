import { money } from "./utils";
import { phone } from "phone";
import { useState } from "react";

const user = JSON.parse(
  localStorage.getItem("USER") ||
    '{ "name": "", "country": "+54", "prefix": "2972", "number": "" }'
);

if (!user.country) {
  localStorage.removeItem("USER");
  window.location.reload();
}

export const Confirmation = ({ selection, setFinished, onSubmit }) => {
  const [name, setName] = useState(user.name);
  const [country, setCountry] = useState(user.country);
  const [prefix, setPrefix] = useState(user.prefix);
  const [number, setNumber] = useState(user.number);
  const [comment, setComment] = useState("");
  return (
    <div>
      <h3 className="title">
        Total:{" "}
        {money(
          Object.keys(selection).reduce(
            (total, current) =>
              total +
              Object.values(selection[current]).reduce(
                (total, { cost, amount }) => total + cost * amount,
                0
              ),
            0
          )
        )}
      </h3>
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input
            onChange={({ target }) => {
              setName(target.value);
            }}
            value={name}
            className="input"
            type="text"
            placeholder="Quien retira?"
          />
        </div>
      </div>
      <label className="label">Numero de Whatsapp</label>
      <div className="field has-addons">
        <p className="control">
          <input
            className="input"
            onChange={({ target }) => {
              setCountry(target.value);
            }}
            value={country}
            type="text"
            maxLength="3"
            size="3"
          />
        </p>
        <p className="control">
          <input
            className="input"
            onChange={({ target }) => {
              setPrefix(target.value);
            }}
            value={prefix}
            type="text"
            maxLength="4"
            size="4"
          />
        </p>
        <p className="control is-expanded">
          <input
            className="input"
            onChange={({ target }) => {
              setNumber(target.value);
            }}
            value={number}
            type="text"
            placeholder="Numero"
          />
        </p>
      </div>

      <div className="field">
        <label className="label">Aclaracion</label>
        <div className="control">
          <textarea
            onChange={({ target }) => {
              setComment(target.value);
            }}
            value={comment}
            className="textarea"
            placeholder="Por si nos queres aclarar algo..."
          ></textarea>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className="button"
            onClick={() => {
              if (!phone(country + prefix + number).isValid) {
                return alert("El numero de telefono no es correcto 🤔");
              }
              localStorage.setItem(
                "USER",
                JSON.stringify({ name, number, country, prefix })
              );
              alert(
                "Tu pedido fue enviado, te vamos a mandar un WhatsApp para confirmar! 🎉"
              );
              onSubmit();
            }}
          >
            Pedir
          </button>
        </div>
        <div className="control">
          <button
            className="button is-danger"
            onClick={() => {
              setFinished(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
