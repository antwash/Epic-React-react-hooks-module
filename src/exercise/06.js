// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import { fetchPokemon, PokemonDataView, PokemonInfoFallback, PokemonForm } from "../pokemon"

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null)
  const [status, setStatus] = React.useState("idle")
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    setStatus("pending")
    fetchPokemon(pokemonName).then(pokemon => {
      setPokemon(pokemon)
      setStatus("resolved")
    }, error => {
      setError(error)
      setStatus("rejected")
    })
  }, [pokemonName])

  if (status === "idle") {
    return <span>Submit a pokemon</span>
  }

  if (status === "rejected") {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />
  }

  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
