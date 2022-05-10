// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import { ErrorBoundary } from "react-error-boundary"

import { fetchPokemon, PokemonDataView, PokemonInfoFallback, PokemonForm } from "../pokemon"


const ErrorFallBack = (props) => {
  return (
    <div role="alert">
      There was an error: <pre style={{ whiteSpace: 'normal' }}>{props.error.message}</pre>
      <button onClick={props.resetErrorBoundary}>Try again!</button>
    </div>
  )
}

function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    status: pokemonName ? "pending" : "idle",
    pokemon: null,
    error: null
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    setState({
      status: "pending"
    })
    fetchPokemon(pokemonName).then(pokemon => {
      setState({
        status: "resolved",
        pokemon: pokemon,
      })
    }, error => {
      setState({
        status: "rejected",
        error: error
      })
    })
  }, [pokemonName])

  if (state.status === "idle") {
    return <span>Submit a pokemon</span>
  }

  if (state.status === "rejected") {
    throw state.error
  }

  if (state.status  === "pending") {
    return <PokemonInfoFallback name={pokemonName} />
  }

  return <PokemonDataView pokemon={state.pokemon} />
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
        {/*Error boundary remounts with new state after a caught error when pokemonName is changed*/}
        <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => setPokemonName("")}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
