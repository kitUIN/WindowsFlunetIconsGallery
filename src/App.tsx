import { useEffect, useState } from 'react'
import {Icon} from '../rollup-plugin/rollup-plugin-pregit'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [data, setData] = useState(new Array<Icon>());
  useEffect(() => {
      fetch('/icons/iconlist.json', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
      
      })
      .then(response => response.json()) 
      .then(data => {
        console.log(data);
        setData(data);
    })
  }, [])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {data.map(item => (
          <div  >
            <img src={item.path} alt={item.name} />
            </div>
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
