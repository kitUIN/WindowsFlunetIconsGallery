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
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card-box">
        <div className="card">
          {data.map((item) => (
            <div style={{ padding: "40px" }}>
              <img
                src={item.path}
                alt={item.name}
                style={{
                  height: "128px",
                  width: "128px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
