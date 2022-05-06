// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import { useRef, useEffect } from "react"
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const ref = useRef()

  useEffect(() => {
    const tiltNode = ref.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })
    // VanillaTilt.init will add an object to your DOM node to cleanup
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
    <div className="tilt-root" ref={ref}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
