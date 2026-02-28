import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PSStoreUI from './Components/StoreUI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PSStoreUI />
    </>
  )
}

export default App
