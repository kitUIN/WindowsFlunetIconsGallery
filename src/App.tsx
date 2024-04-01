import { useEffect, useState } from "react";
import { Icon } from "../rollup-plugin/rollup-plugin-pregit";

function App() {
  const [data, setData] = useState(new Array<Icon>());
  useEffect(() => {
    fetch("/icons/iconlist.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        {data.map((item) => (
          <div className="ficon">
            <img src={item.path} alt={item.name} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
