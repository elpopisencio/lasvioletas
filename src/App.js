import logo from "./logo.svg";
import data from "./data.json";
import { useState } from "react";
import { Order } from "./Order";
import { Confirmation } from "./Confirmation";
import { setData } from "./utils";

function App() {
  const [finished, setFinished] = useState(false);
  const [selection, setSelection] = useState(setData());
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "10vh",
      }}
    >
      <img src={logo} alt="logo" style={{ margin: "30px" }} />
      <br />
      {finished ? (
        <Confirmation
          selection={selection}
          setFinished={setFinished}
          onSubmit={() => {
            setSelection(setData());
            setFinished(false);
          }}
        />
      ) : (
        <Order
          data={data}
          selection={selection}
          setSelection={setSelection}
          setFinished={setFinished}
        />
      )}
    </div>
  );
}

export default App;
