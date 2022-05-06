// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect, useState} from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = useState(() => {
    return window.localStorage.getItem("name") ?? initialName
  })

  useEffect(() => {
    window.localStorage.setItem("name", name)
  }, [name])


  function handleChange(event) {
    setName(event.target.value)
  }
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
  return <Greeting />
}

export default App
