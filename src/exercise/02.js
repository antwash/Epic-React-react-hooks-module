// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useEffect, useState } from 'react'


function useLocalStorageState(key = "", defaultValue = "" ) {
  const [value, setValue] = useState(() => {
    return window.localStorage.getItem(key) ?? defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, value)
  }, [key, value])

  return [
    value,
    setValue
  ]
}

function Greeting({ initialName = '' }) {
  const [ name, setName ] = useLocalStorageState("name", initialName)

  const handleChange = (event) => setName(event.target.value)

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Anthony!" />
}

export default App
